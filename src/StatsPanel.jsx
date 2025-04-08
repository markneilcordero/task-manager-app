import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function StatsPanel({ tasks }) {
  // Calculate the statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  
  // Calculate overdue tasks
  const overdueTasks = tasks.filter(task => task.dueDate && new Date(task.dueDate) < new Date() && !task.completed).length;

  return (
    <div className="card card-body mb-3">
      <h5>Task Statistics</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Total Tasks:</strong> {totalTasks}
        </li>
        <li className="list-group-item">
          <strong>Completed Tasks:</strong> {completedTasks}
        </li>
        <li className="list-group-item">
          <strong>Pending Tasks:</strong> {pendingTasks}
        </li>
        <li className="list-group-item">
          <strong>Overdue Tasks:</strong> {overdueTasks}
        </li>
      </ul>
    </div>
  );
}
