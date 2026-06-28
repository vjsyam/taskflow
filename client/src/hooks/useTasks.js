import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as api from '../api/taskApi';
import { sortTasks } from '../utils/formatters';

const INITIAL_FORM = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
};

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  // Filters + sort
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Form / modal state
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // null = create, object = edit
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // Delete confirm modal
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.fetchTasks();
      setTasks(res.data);
    } catch (err) {
      toast.error(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // ── Derived: filtered + sorted ────────────────────────────────────────────
  const filteredTasks = sortTasks(
    tasks.filter((t) => {
      const matchStatus = filterStatus === 'all' || t.status === filterStatus;
      const matchPriority = filterPriority === 'all' || t.priority === filterPriority;
      return matchStatus && matchPriority;
    }),
    sortBy
  );

  // ── Form helpers ──────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditingTask(null);
    setFormData(INITIAL_FORM);
    setErrors({});
    setShowForm(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
    });
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
    setErrors({});
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear individual field error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.trim().length > 120) newErrors.title = 'Title cannot exceed 120 characters';
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(formData.dueDate) < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setFormLoading(true);
    try {
      if (editingTask) {
        const res = await api.updateTask(editingTask._id, formData);
        setTasks((prev) => prev.map((t) => (t._id === editingTask._id ? res.data : t)));
        toast.success('Task updated');
      } else {
        const res = await api.createTask(formData);
        setTasks((prev) => [res.data, ...prev]);
        toast.success('Task created');
      }
      closeForm();
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const confirmDelete = (task) => setDeleteTarget(task);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.deleteTask(deleteTarget._id);
      setTasks((prev) => prev.filter((t) => t._id !== deleteTarget._id));
      toast.success('Task deleted');
    } catch (err) {
      toast.error(err.message || 'Failed to delete task');
    } finally {
      setDeleteTarget(null);
    }
  };

  return {
    // Data
    tasks,
    filteredTasks,
    loading,
    formLoading,
    // Filters
    filterStatus, setFilterStatus,
    filterPriority, setFilterPriority,
    sortBy, setSortBy,
    // Form
    showForm,
    editingTask,
    formData,
    errors,
    openCreate,
    openEdit,
    closeForm,
    handleFieldChange,
    handleSubmit,
    // Delete
    deleteTarget,
    confirmDelete,
    cancelDelete,
    handleDelete,
  };
};
