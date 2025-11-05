import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from '../messages/MessageList';
import MessageInput from '../messages/MessageInput';
import UserManagement from '../users/UserManagement';

function MainContent({ 
  activeChannel, 
  messages, 
  currentUser, 
  onSendMessage,
  onAddUser,
  onRemoveUser,
  allUsers,
  channels,
  onMobileMenuToggle
}) {
  const [showUserManagement, setShowUserManagement] = useState(false);

  if (!activeChannel) {
    return (
      <div className="main-content no-channel">
        <div className="chat-header-mobile">
          <button className="mobile-menu-btn" onClick={onMobileMenuToggle} aria-label="Toggle menu">
            ☰
          </button>
          <h2>Real-Time Chat</h2>
        </div>
        <div className="welcome-message">
          <h2>Добро пожаловать в Real Time Chat</h2>
          <p>Выберите канал для начала общения или создайте новый</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <ChatHeader
        channel={activeChannel}
        currentUser={currentUser}
        onToggleUserManagement={() => setShowUserManagement(!showUserManagement)}
        showUserManagement={showUserManagement}
        onMobileMenuToggle={onMobileMenuToggle}
      />

      {showUserManagement ? (
        <div className="user-management-panel">
          <UserManagement
            channel={activeChannel}
            currentUser={currentUser}
            onAddUser={onAddUser}
            onRemoveUser={onRemoveUser}
            allUsers={allUsers}
            channels={channels}
          />
        </div>
      ) : (
        <>
          <MessageList messages={messages} currentUser={currentUser} />
          <MessageInput onSendMessage={onSendMessage} />
        </>
      )}
    </div>
  );
}

export default MainContent;