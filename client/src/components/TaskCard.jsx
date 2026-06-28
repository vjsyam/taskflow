import React from 'react';
import { RiEditLine, RiDeleteBinLine, RiCalendarLine, RiAlertLine } from 'react-icons/ri';
import { StatusBadge, PriorityBadge } from './Badges';
import { formatDate, shortId, isOverdue } from '../utils/formatters';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <article className={`task-card ${task.status === 'done' ? 'task-card--done' : ''} ${overdue ? 'task-card--overdue' : ''}`}>
      <div className="task-card__header">
        <span className="task-id">{shortId(task._id)}</span>
        <div className="task-card__badges">
          <PriorityBadge priority={task.priority} />
          <StatusBadge status={task.status} />
        </div>
      </div>

      <div className="task-card__body">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      <div className="task-card__footer">
        <div className={`task-due ${overdue ? 'task-due--overdue' : ''}`}>
          {overdue && <RiAlertLine className="due-icon" />}
          <RiCalendarLine className="due-icon" />
          <span className="task-due__label">
            {overdue ? 'Overdue · ' : ''}{formatDate(task.dueDate)}
          </span>
        </div>

        <div className="task-card__actions">
          <button
            className="icon-btn icon-btn--edit"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label={`Edit task ${shortId(task._id)}`}
          >
            <RiEditLine />
          </button>
          <button
            className="icon-btn icon-btn--delete"
            onClick={() => onDelete(task)}
            title="Delete task"
            aria-label={`Delete task ${shortId(task._id)}`}
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
