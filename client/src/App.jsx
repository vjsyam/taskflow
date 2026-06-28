import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RiAddLine } from 'react-icons/ri';
import Sidebar from './components/Sidebar';
import StatsBar from './components/StatsBar';
import TaskRow from './components/TaskRow';
import TaskForm from './components/TaskForm';
import ConfirmModal from './components/ConfirmModal';
import { useTasks } from './hooks/useTasks';

const SORT_OPTIONS = [
  { value: 'newest',       label: 'Newest' },
  { value: 'oldest',       label: 'Oldest' },
  { value: 'dueDate-asc',  label: 'Due ↑' },
  { value: 'dueDate-desc', label: 'Due ↓' },
  { value: 'priority-asc', label: 'Priority ↑' },
  { value: 'priority-desc',label: 'Priority ↓' },
];

function App() {
  const {
    tasks, filteredTasks, loading, formLoading,
    filterStatus, setFilterStatus,
    filterPriority, setFilterPriority,
    sortBy, setSortBy,
    showForm, editingTask, formData, errors,
    openCreate, openEdit, closeForm, handleFieldChange, handleSubmit,
    deleteTarget, confirmDelete, cancelDelete, handleDelete,
  } = useTasks();

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2800,
          style: {
            background: '#17171b',
            color: '#f0f0f0',
            border: '1px solid #242428',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.82rem',
            borderRadius: '8px',
          },
          success: { iconTheme: { primary: '#f59e0b', secondary: '#17171b' } },
          error:   { iconTheme: { primary: '#f87171', secondary: '#17171b' } },
        }}
      />

      <div className="shell">
        {/* ── Sidebar ── */}
        <Sidebar
          tasks={tasks}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          onCreateTask={openCreate}
        />

        {/* ── Main ── */}
        <div className="main">
          {/* Mobile header */}
          <div className="mobile-header">
            <span className="mobile-brand">TaskFlow</span>
            <button className="btn btn-amber" onClick={openCreate} style={{ padding: '7px 12px', fontSize: '0.78rem' }}>
              <RiAddLine size={14} /> New Task
            </button>
          </div>

          {/* Dashboard greeting header */}
          {!loading && (
            <div className="dash-header">
              <div className="dash-greeting">
                Your <em>tasks</em>, in one place.
              </div>
              <div className="dash-sub">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          )}

          {/* Stats bar */}
          {!loading && <StatsBar tasks={tasks} />}

          {/* Top bar */}
          <div className="topbar">
            <div className="topbar-title">
              {filterStatus === 'all' ? (
                <><span>All tasks</span> — {tasks.length} total</>
              ) : (
                <><span style={{ textTransform: 'capitalize' }}>{filterStatus}</span> — {filteredTasks.length} tasks</>
              )}
            </div>

            <div className="topbar-sort">
              <span>Sort:</span>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Sort tasks"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Column headers */}
          {!loading && filteredTasks.length > 0 && (
            <div className="list-header">
              <div className="list-header-cell" />
              <div className="list-header-cell">ID</div>
              <div className="list-header-cell">Title</div>
              <div className="list-header-cell">Status</div>
              <div className="list-header-cell">Priority</div>
              <div className="list-header-cell">Due</div>
              <div className="list-header-cell" />
            </div>
          )}

          {/* Task list */}
          <div className="task-list">
            {/* Skeleton */}
            {loading && [...Array(8)].map((_, i) => (
              <div key={i} className="skeleton-row">
                <div className="skel" style={{ width: 10, height: 10, borderRadius: 2 }} />
                <div className="skel" style={{ width: 56, height: 10 }} />
                <div className="skel" style={{ flex: 1, height: 10 }} />
                <div className="skel" style={{ width: 80, height: 20, borderRadius: 20 }} />
                <div className="skel" style={{ width: 60, height: 18, borderRadius: 4 }} />
                <div className="skel" style={{ width: 72, height: 10 }} />
              </div>
            ))}

            {/* Empty — no tasks at all */}
            {!loading && tasks.length === 0 && (
              <div className="empty">
                <div className="empty-glyph">□</div>
                <div className="empty-title">No tasks yet</div>
                <div className="empty-sub">Hit "New Task" to add your first one.</div>
                <button className="btn btn-amber" onClick={openCreate} style={{ marginTop: 12 }}>
                  <RiAddLine size={14} /> New Task
                </button>
              </div>
            )}

            {/* Empty — filter mismatch */}
            {!loading && tasks.length > 0 && filteredTasks.length === 0 && (
              <div className="empty">
                <div className="empty-glyph">∅</div>
                <div className="empty-title">No tasks match this filter</div>
                <button className="btn btn-ghost" style={{ marginTop: 12 }} onClick={() => { setFilterStatus('all'); setFilterPriority('all'); }}>
                  Clear filters
                </button>
              </div>
            )}

            {/* Rows */}
            {!loading && filteredTasks.map(task => (
              <TaskRow
                key={task._id}
                task={task}
                onEdit={openEdit}
                onDelete={confirmDelete}
              />
            ))}
          </div>
        </div>
      </div>

      <TaskForm
        isOpen={showForm}
        isEditing={!!editingTask}
        formData={formData}
        errors={errors}
        loading={formLoading}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onClose={closeForm}
      />
      <ConfirmModal task={deleteTarget} onConfirm={handleDelete} onCancel={cancelDelete} />
    </>
  );
}

export default App;
