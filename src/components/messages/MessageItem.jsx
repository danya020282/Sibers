import React from 'react';
import usersData from '../../data/users.json';

/**
 * Individual message component
 * Shows user avatar, name, message content and timestamp
 */
function MessageItem({ message, isOwn }) {
  // Find user data from users.json
  const user = usersData.find(u => u.id === message.userId);

  // Return null if user not found (shouldn't happen)
  if (!user) return null;

  // Format timestamp
  const messageTime = new Date(message.timestamp);
  const timeString = messageTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`message-item ${isOwn ? 'own-message' : ''}`}>
      {/* User avatar */}
      <img 
        src={user.avatar} 
        alt={user.name} 
        className="message-avatar"
        title={user.name}
      />
      
      {/* Message content */}
      <div className="message-content">
        <div className="message-header">
          <span className="user-name">{user.name}</span>
          <span className="message-time" title={messageTime.toLocaleString()}>
            {timeString}
          </span>
        </div>
        <div className="message-text">{message.text}</div>
      </div>
    </div>
  );
}

export default MessageItem;