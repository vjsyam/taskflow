import React from 'react';

const STATUS_CONFIG = {
  todo: { label: 'Todo', className: 'badge-status-todo' },
  'in-progress': { label: 'In Progress', className: 'badge-status-inprogress' },
  done: { label: 'Done', className: 'badge-status-done' },
};

const PRIORITY_CONFIG = {
  low: { label: 'Low', className: 'badge-priority-low' },
  medium: { label: 'Medium', className: 'badge-priority-medium' },
  high: { label: 'High', className: 'badge-priority-high' },
};

export const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || { label: status, className: '' };
  return <span className={`badge badge-status ${config.className}`}>{config.label}</span>;
};

export const PriorityBadge = ({ priority }) => {
  const config = PRIORITY_CONFIG[priority] || { label: priority, className: '' };
  return <span className={`badge badge-priority ${config.className}`}>{config.label}</span>;
};
