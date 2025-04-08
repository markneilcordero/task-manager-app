import React from 'react';
import { formatDistanceToNow } from 'date-fns'; // For formatting due date (optional)
import CategoryBadge from './CategoryBadge'; // Import CategoryBadge
import PriorityBadge from './PriorityBadge'; // Import PriorityBadge

export default function TaskItem({ task, onEdit, onDelete }) {
  const { id, title, description, priority, dueDate, completed } = task;

  // Format the due date to display relative time (e.g., "3 days left")
  const formattedDueDate = dueDate ? formatDistanceToNow(new Date(dueDate), { addSuffix: true }) : 'No due date';

  // Styling class for completed tasks
  const taskStatusClass = completed ? 'text-decoration-line-through text-muted' : '';

  // Handle Delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(id); // Call onDelete prop passed from TaskList
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h5 className={`mb-1 ${taskStatusClass}`}>{title}</h5>
        <p className={`mb-1 ${taskStatusClass}`}>{description}</p>
        <small className={`text-muted ${taskStatusClass}`}>Due: {formattedDueDate}</small>
      </div>

      <div>
        {/* Priority Badge */}
        <span
          className={`badge ms-2 ${priority === 'High' ? 'bg-danger' : priority === 'Medium' ? 'bg-warning' : 'bg-success'}`}
        >
          {priority}
        </span>

        {/* Task completion checkbox */}
        <button
          onClick={() => onEdit(task)} // Call onEdit to switch to the edit mode for this task
          className="btn btn-sm btn-info ms-2"
          title="Edit task"
        >
          Edit
        </button>

        {/* Task delete button */}
        <button
          onClick={handleDelete}
          className="btn btn-sm btn-danger ms-2"
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
