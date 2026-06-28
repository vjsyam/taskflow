import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { formatDate, shortId, isOverdue } from '../utils/formatters';

const STATUS_CHIP = {
  'todo':        { label: 'Todo',        cls: 'chip-todo',        dot: 'chip-dot-todo' },
  'in-progress': { label: 'In Progress', cls: 'chip-inprogress',  dot: 'chip-dot-inprogress' },
  'done':        { label: 'Done',        cls: 'chip-done',        dot: 'chip-dot-done' },
};

const PRIORITY_CLS = { high: 'pchip-high', medium: 'pchip-medium', low: 'pchip-low' };
const INDICATOR_CLS = { high: 'high', medium: 'medium', low: 'low' };

const TaskRow = ({ task, onEdit, onDelete }) => {
  const overdue = isOverdue(task.dueDate, task.status);
  const chip = STATUS_CHIP[task.status] || STATUS_CHIP['todo'];

  return (
    <div
      className={`task-row ${task.status === 'done' ? 'task-row--done' : ''} ${overdue ? 'task-row--overdue' : ''}`}
      onClick={() => onEdit(task)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onEdit(task)}
      aria-label={`Edit task: ${task.title}`}
      style={{ cursor: 'pointer' }}
    >
      {/* Col 1 — priority indicator */}
      <div className="task-row-cell" style={{ display:'flex', alignItems:'center' }}>
        <div className={`priority-indicator ${INDICATOR_CLS[task.priority]}`} title={`Priority: ${task.priority}`} />
      </div>

      {/* Col 2 — ID */}
      <div className="task-row-cell">
        <span className="task-row-id">{shortId(task._id)}</span>
      </div>

      {/* Col 3 — title + desc */}
      <div className="task-row-cell">
        <div className="task-row-title-wrap">
          <span className="task-row-title">{task.title}</span>
          {task.description && (
            <span className="task-row-desc">{task.description}</span>
          )}
        </div>
      </div>

      {/* Col 4 — status chip */}
      <div className="task-row-cell">
        <span className={`chip ${chip.cls}`}>
          <span className={`chip-dot ${chip.dot}`} />
          {chip.label}
        </span>
      </div>

      {/* Col 5 — priority chip */}
      <div className="task-row-cell">
        <span className={`pchip ${PRIORITY_CLS[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>

      {/* Col 6 — due date */}
      <div className="task-row-cell">
        <span className={`task-row-due ${overdue ? 'overdue' : ''}`}>
          {formatDate(task.dueDate)}
        </span>
      </div>

      {/* Col 7 — delete action only (row click = edit) */}
      <div className="task-row-cell">
        <div className="row-actions">
          <button
            className="row-btn del"
            onClick={e => { e.stopPropagation(); onDelete(task); }}
            title="Delete task"
            aria-label={`Delete ${task.title}`}
            id={`delete-${task._id}`}
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskRow;
