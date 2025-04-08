import React, { useState, useEffect } from 'react';

const initialFormState = {
  id: null,
  title: '',
  description: '',
  category: '',
  priority: 'Low',
  dueDate: '',
  completed: false,
};

export default function TaskForm({ onSave, editingTask, onCancel }) {
  const [task, setTask] = useState(initialFormState);

  // Load editing task into form
  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask(initialFormState);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return alert('Title is required');
    
    // If no ID, generate a unique one (timestamp-based)
    const newTask = {
      ...task,
      id: task.id || Date.now(),
    };

    onSave(newTask);
    setTask(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-3">
      <h5>{editingTask ? 'Edit Task' : 'Add New Task'}</h5>

      <div className="mb-2">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Category</label>
        <input
          type="text"
          name="category"
          value={task.category}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Priority</label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="form-select"
        >
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={() => {
              setTask(initialFormState);
              onCancel();
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
