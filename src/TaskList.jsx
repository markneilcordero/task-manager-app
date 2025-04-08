import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="mt-3">
      <h4>Task List</h4>
      {tasks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No tasks available. Add a task to get started!
        </div>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
