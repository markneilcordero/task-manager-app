import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleComplete, deleteTask }) {
    return (
        <div className="list-group">
            {tasks.length === 0 ? (
                <p className="text-center text-muted">No tasks available. Add some!</p>
            ) : (
                tasks.map(task => (
                    <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} />
                ))
            )}
        </div>
    );
}

export default TaskList;