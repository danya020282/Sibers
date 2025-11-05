import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';

/**
 * Message list container with auto-scroll to bottom
 * Handles empty state and message rendering
 */
function MessageList({ messages, currentUser }) {
  const messagesEndRef = useRef(null);

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        // Empty state
        <div className="no-messages">
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>Нет сообщений</h3>
            <p>Начните разговор, отправив сообщение!</p>
          </div>
        </div>
      ) : (
        // Messages list
        <>
          {messages.map(message => (
            <MessageItem
              key={message.id}
              message={message}
              isOwn={message.userId === currentUser.id}
            />
          ))}
          {/* Invisible element for auto-scroll */}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}

export default MessageList;