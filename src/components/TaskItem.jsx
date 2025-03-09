import React from "react";

function TaskItem({ task, toggleComplete, deleteTask }) {
    return (
        <div className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? "bg-light text-muted" : ""}`}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none"}}>
                {task.text}
            </span>
            <div>
                <button className="btn btn-sm btn-success me-2" onClick={() => toggleComplete(task.id)}>
                    {task.completed ? "Undo" : "Complete"}
                </button>
                <button classnName="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;