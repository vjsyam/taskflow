/**
 * Format ISO date string to "Jun 28, 2026"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format ISO date to YYYY-MM-DD for <input type="date">
 */
export const toInputDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString().slice(0, 10);
};

/**
 * Return today's date as YYYY-MM-DD (for min attribute on date input)
 */
export const todayString = () => new Date().toISOString().slice(0, 10);

/**
 * Return a short task ID (last 6 chars of Mongo ObjectId)
 */
export const shortId = (id) => (id ? `#${id.slice(-6).toUpperCase()}` : '');

/**
 * Check if a date is overdue (past today and task not done)
 */
export const isOverdue = (dateStr, status) => {
  if (!dateStr || status === 'done') return false;
  return new Date(dateStr) < new Date(new Date().toDateString());
};

/**
 * Priority sort order
 */
export const priorityOrder = { high: 0, medium: 1, low: 2 };

/**
 * Sort tasks by field
 */
export const sortTasks = (tasks, sortBy) => {
  const sorted = [...tasks];
  switch (sortBy) {
    case 'dueDate-asc':
      return sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    case 'dueDate-desc':
      return sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    case 'priority-asc':
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case 'priority-desc':
      return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    default:
      return sorted;
  }
};
