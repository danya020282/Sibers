import React, { useState } from 'react';

/**
 * Message input component with send functionality
 * Handles form submission and input validation
 */
function MessageInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');

  /**
   * 
   * @param {Event} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  /**
   * 
   * @param {Event} e 
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Выберите канал для начала общения..." : "Напишите сообщение..."}
          className="message-input"
          disabled={disabled}
          maxLength={500}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!message.trim() || disabled}
          aria-label="Отправить сообщение"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
      
     
      <div className="input-meta">
        <span className={`char-count ${message.length > 400 ? 'warning' : ''}`}>
          {message.length}/500
        </span>
      </div>
    </form>
  );
}

export default MessageInput;