import React from 'react';

export default function PriorityBadge({ priority }) {
  // Set the background color of the badge based on priority level
  let priorityClass = 'bg-success'; // Default for Low priority

  switch (priority) {
    case 'High':
      priorityClass = 'bg-danger'; // Red for High priority
      break;
    case 'Medium':
      priorityClass = 'bg-warning'; // Yellow for Medium priority
      break;
    case 'Low':
      priorityClass = 'bg-success'; // Green for Low priority
      break;
    default:
      priorityClass = 'bg-secondary'; // Default fallback for invalid or no priority
  }

  return (
    <span className={`badge ${priorityClass} ms-2`}>
      {priority}
    </span>
  );
}
