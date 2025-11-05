import React from 'react';

/**
 * User item component for displaying user information
 * Used in member lists and search results
 */
function UserItem({ 
  user, 
  showActions = false, 
  onRemove, 
  isAdmin = false,
  isCurrentUser = false 
}) {
  return (
    <div className="user-item">
      <div className="user-avatar-container">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="user-avatar"
        />
        {isAdmin && <span className="admin-indicator" title="Channel Admin">👑</span>}
      </div>
      
      <div className="user-info">
        <div className="user-main-info">
          <span className="user-name">{user.name}</span>
          {isCurrentUser && <span className="current-user-badge">Вы</span>}
        </div>
        <div className="user-secondary-info">
          <span className="user-username">@{user.username}</span>
          <span className="user-email">{user.email}</span>
        </div>
        <div className="user-company">
          {user.company.name}
        </div>
      </div>

      {showActions && onRemove && !isCurrentUser && (
        <div className="user-actions">
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onRemove(user.id)}
            title={`Удалить ${user.name}`}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}

export default UserItem;