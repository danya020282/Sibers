import React, { useEffect } from 'react';

/**
 * Reusable modal component
 * Handles overlay click and escape key to close
 */
function Modal({ isOpen, onClose, title, children }) {
  /**
   * Handle escape key press to close modal
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        {/* Modal header */}
        <div className="modal-header">
          <h3 id="modal-title">{title}</h3>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal body */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;