import React from 'react';

export default function EmptyState({ onAddTask }) {
  return (
    <div className="text-center">
      <h4>No Tasks Available</h4>
      <p>Looks like you don't have any tasks yet. Start by adding a new task!</p>
      <button className="btn btn-primary" onClick={onAddTask}>
        Add New Task
      </button>
    </div>
  );
}
