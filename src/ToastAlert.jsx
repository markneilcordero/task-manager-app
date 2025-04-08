import React, { useEffect } from 'react';

export default function ToastAlert({ message, type, onClose }) {
  // Auto close the toast after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Close the toast after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  // Determine the toast class based on the type of message
  const toastClass = type === 'success'
    ? 'bg-success'
    : type === 'error'
    ? 'bg-danger'
    : 'bg-info';

  return (
    message && (
      <div className={`toast show position-fixed top-0 end-0 m-3 ${toastClass}`} role="alert">
        <div className="toast-body">
          {message}
          <button
            type="button"
            className="btn-close btn-close-white ms-2"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    )
  );
}
