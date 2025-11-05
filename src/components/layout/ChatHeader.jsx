import React from 'react';

/**
 * Chat header component showing channel info and actions
 * Includes admin controls for channel management
 */
function ChatHeader({ channel, currentUser, onToggleUserManagement, showUserManagement, onMobileMenuToggle }) {
  const isAdmin = channel.creator === currentUser.id;

  return (
    <div className="chat-header">
      <div className="channel-info">
        <div className="channel-title">
          <button className="mobile-menu-btn" onClick={onMobileMenuToggle} aria-label="Toggle menu">
            ☰
          </button>
          <h2>#{channel.name}</h2>
          {isAdmin && <span className="admin-badge" title="Вы являетесь администратором канала">👑</span>}
          {channel.isPrivate && <span className="private-badge" title="Private channel">🔒</span>}
        </div>
        <div className="channel-meta">
          <span className="member-count">{channel.members.length} участников</span>
          <span className="channel-type">{channel.isPrivate ? 'Приватный' : 'Общий'} канал</span>
        </div>
      </div>

      <div className="channel-actions">
        {/* User management toggle for admins */}
        {isAdmin && (
          <button 
            className={`btn ${showUserManagement ? 'btn-primary' : 'btn-secondary'}`}
            onClick={onToggleUserManagement}
          >
            {showUserManagement ? 'Назад к чату' : 'Управление участниками'}
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatHeader;