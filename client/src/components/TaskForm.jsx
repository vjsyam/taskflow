import React, { useEffect, useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { todayString } from '../utils/formatters';

const STATUSES  = [
  { value: 'todo',        label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done',        label: 'Done' },
];
const PRIORITIES = [
  { value: 'low',    label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high',   label: 'High' },
];

const TaskForm = ({ isOpen, isEditing, formData, errors, loading, onChange, onSubmit, onClose }) => {
  const firstRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => firstRef.current?.focus(), 60);
  }, [isOpen]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-head">
          <h2 id="form-title">{isEditing ? 'Edit task' : 'New task'}</h2>
          <button className="modal-x" onClick={onClose} aria-label="Close"><RiCloseLine /></button>
        </div>

        <form onSubmit={onSubmit} noValidate className="form">
          {/* Title */}
          <div className="field">
            <label htmlFor="f-title">Title <span className="req">*</span></label>
            <input
              ref={firstRef}
              id="f-title"
              type="text"
              className={`input ${errors.title ? 'field-err' : ''}`}
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={e => onChange('title', e.target.value)}
              maxLength={120}
            />
            {errors.title && <span className="err-msg">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="field">
            <label htmlFor="f-desc">Description</label>
            <textarea
              id="f-desc"
              className="textarea"
              placeholder="Add context (optional)"
              value={formData.description}
              onChange={e => onChange('description', e.target.value)}
              maxLength={1000}
            />
          </div>

          {/* Status + Priority */}
          <div className="form-row">
            <div className="field">
              <label htmlFor="f-status">Status</label>
              <select id="f-status" className="select" value={formData.status} onChange={e => onChange('status', e.target.value)}>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-priority">Priority</label>
              <select id="f-priority" className="select" value={formData.priority} onChange={e => onChange('priority', e.target.value)}>
                {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>

          {/* Due date */}
          <div className="field">
            <label htmlFor="f-due">Due date <span className="req">*</span></label>
            <input
              id="f-due"
              type="date"
              className={`input ${errors.dueDate ? 'field-err' : ''}`}
              value={formData.dueDate}
              min={todayString()}
              onChange={e => onChange('dueDate', e.target.value)}
            />
            {errors.dueDate && <span className="err-msg">{errors.dueDate}</span>}
          </div>

          <div className="form-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn btn-amber" disabled={loading} id="submit-task-btn">
              {loading ? 'Saving…' : isEditing ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
