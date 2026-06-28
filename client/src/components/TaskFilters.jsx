import React from 'react';
import { RiFilterLine, RiSortAsc } from 'react-icons/ri';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'dueDate-asc', label: 'Due Date ↑' },
  { value: 'dueDate-desc', label: 'Due Date ↓' },
  { value: 'priority-asc', label: 'Priority ↑' },
  { value: 'priority-desc', label: 'Priority ↓' },
];

const TaskFilters = ({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  sortBy,
  setSortBy,
  filteredCount,
  totalCount,
}) => {
  const isFiltered = filterStatus !== 'all' || filterPriority !== 'all';

  return (
    <div className="filters-bar">
      <div className="filters-left">
        <RiFilterLine className="filters-icon" />
        <div className="filter-group">
          <select
            id="filter-status"
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter by status"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <select
            id="filter-priority"
            className="filter-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            aria-label="Filter by priority"
          >
            {PRIORITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        {isFiltered && (
          <button
            className="btn-clear-filters"
            onClick={() => { setFilterStatus('all'); setFilterPriority('all'); }}
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="filters-right">
        <span className="result-count">
          {filteredCount === totalCount
            ? `${totalCount} tasks`
            : `${filteredCount} of ${totalCount}`}
        </span>
        <RiSortAsc className="filters-icon" />
        <select
          id="sort-select"
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort tasks"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
