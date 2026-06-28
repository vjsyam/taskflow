import React from 'react';
import { RiAddLine, RiCheckboxMultipleLine } from 'react-icons/ri';

const Header = ({ taskCount, onCreateTask }) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="brand-icon">
            <RiCheckboxMultipleLine />
          </span>
          <div>
            <h1 className="brand-name">TaskFlow</h1>
            <p className="brand-tagline">Track what matters</p>
          </div>
        </div>

        <div className="header-right">
          <div className="task-count-badge">
            <span className="count-number">{taskCount}</span>
            <span className="count-label">{taskCount === 1 ? 'task' : 'tasks'}</span>
          </div>
          <button className="btn-primary" onClick={onCreateTask} id="create-task-btn">
            <RiAddLine className="btn-icon" />
            New Task
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
