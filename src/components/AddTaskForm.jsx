import React, { useState } from "react";

function AddTaskForm({ addTask }) {
    const [taskText, setTaskText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim() === "") return;
        addTask(taskText);
        setTaskText("");
    };

    return (
        <form onSubmit={handleSubmit} className="input-group mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Enter a task..."
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
    );
}

export default AddTaskForm;