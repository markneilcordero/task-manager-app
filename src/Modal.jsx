import React from 'react';

export default function Modal({ showModal, closeModal, onSave, onDelete, task, type }) {
  // Handle form input change (if task editing)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    task[name] = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'edit') {
      onSave(task); // Save the updated task
    } else if (type === 'delete') {
      onDelete(task.id); // Delete the task
    }
    closeModal(); // Close the modal after action
  };

  return (
    <>
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  {type === 'edit' ? 'Edit Task' : 'Delete Task'}
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {type === 'edit' ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={task.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={task.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dueDate" className="form-label">Due Date</label>
                      <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        className="form-control"
                        value={task.dueDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <button type="button" className="btn btn-secondary" onClick={closeModal}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>Are you sure you want to delete this task?</p>
                )}
              </div>
              <div className="modal-footer">
                {type === 'delete' && (
                  <button type="button" className="btn btn-danger" onClick={handleSubmit}>
                    Yes, Delete
                  </button>
                )}
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
