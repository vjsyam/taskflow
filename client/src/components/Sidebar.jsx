import React from 'react';
import { RiAddLine } from 'react-icons/ri';
import { TbLayoutKanban } from 'react-icons/tb';

const STATUS_FILTERS = [
  { key: 'all',         label: 'All Tasks',   dotClass: 'status-dot-all' },
  { key: 'todo',        label: 'Todo',        dotClass: 'status-dot-todo' },
  { key: 'in-progress', label: 'In Progress', dotClass: 'status-dot-inprogress' },
  { key: 'done',        label: 'Done',        dotClass: 'status-dot-done' },
];

const PRIORITY_FILTERS = [
  { key: 'all',    label: 'All',    dotClass: '' },
  { key: 'high',   label: 'High',   dotClass: 'priority-dot-high' },
  { key: 'medium', label: 'Medium', dotClass: 'priority-dot-medium' },
  { key: 'low',    label: 'Low',    dotClass: 'priority-dot-low' },
];

const Sidebar = ({
  tasks,
  filterStatus, setFilterStatus,
  filterPriority, setFilterPriority,
  onCreateTask,
}) => {
  // live counts
  const counts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };
  const pCounts = {
    all: tasks.length,
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
  };

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-dot">
          <TbLayoutKanban />
        </div>
        <div>
          <div className="brand-text">TaskFlow</div>
          <span className="brand-version">v1.0.0</span>
        </div>
      </div>

      {/* Status filters */}
      <div className="sidebar-section">
        <div className="sidebar-label">Status</div>
        {STATUS_FILTERS.map(({ key, label, dotClass }) => (
          <div
            key={key}
            className={`stat-row ${filterStatus === key ? 'active' : ''}`}
            onClick={() => setFilterStatus(key)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setFilterStatus(key)}
          >
            <div className="stat-row-left">
              <div className={`stat-dot ${dotClass}`} />
              <span className="stat-label">{label}</span>
            </div>
            <span className="stat-count">
              {counts[key] ?? 0}
            </span>
          </div>
        ))}
      </div>

      {/* Priority filters */}
      <div className="sidebar-section">
        <div className="sidebar-label">Priority</div>
        {PRIORITY_FILTERS.filter(f => f.key !== 'all').map(({ key, label, dotClass }) => (
          <div
            key={key}
            className={`stat-row ${filterPriority === key ? 'active' : ''}`}
            onClick={() => setFilterPriority(prev => prev === key ? 'all' : key)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setFilterPriority(prev => prev === key ? 'all' : key)}
          >
            <div className="stat-row-left">
              <div className={`stat-dot ${dotClass}`} />
              <span className="stat-label">{label}</span>
            </div>
            <span className="stat-count">{pCounts[key] ?? 0}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Create button at bottom of sidebar */}
      <button className="sidebar-create" onClick={onCreateTask} id="create-task-btn">
        <RiAddLine size={15} />
        New Task
      </button>
    </aside>
  );
};

export default Sidebar;
