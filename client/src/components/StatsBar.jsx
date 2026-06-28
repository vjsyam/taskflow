import React from 'react';
import { isOverdue } from '../utils/formatters';
import { RiCheckboxCircleLine, RiTimeLine, RiTodoLine, RiListCheck2 } from 'react-icons/ri';

const StatsBar = ({ tasks }) => {
  const total      = tasks.length;
  const todo       = tasks.filter(t => t.status === 'todo').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const done       = tasks.filter(t => t.status === 'done').length;
  const overdue    = tasks.filter(t => isOverdue(t.dueDate, t.status)).length;

  const stats = [
    { label: 'Total',       value: total,      icon: <RiListCheck2 />,        cls: 'stat-card--total' },
    { label: 'Todo',        value: todo,        icon: <RiTodoLine />,          cls: 'stat-card--todo' },
    { label: 'In Progress', value: inProgress,  icon: <RiTimeLine />,          cls: 'stat-card--inprogress' },
    { label: 'Done',        value: done,        icon: <RiCheckboxCircleLine />, cls: 'stat-card--done' },
  ];

  return (
    <div className="stats-bar">
      {stats.map(s => (
        <div key={s.label} className={`stat-card ${s.cls}`}>
          <div className="stat-card-icon">{s.icon}</div>
          <div className="stat-card-body">
            <span className="stat-card-value">{s.value}</span>
            <span className="stat-card-label">{s.label}</span>
          </div>
          {s.label === 'Total' && overdue > 0 && (
            <div className="stat-card-overdue">{overdue} overdue</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
