import React from 'react';

/**
 * User selection screen - allows choosing which user to chat as
 * Uses data from the provided users.json file
 */
function UserSelection({ users, onUserSelect }) {
  return (
    <div className="user-selection">
      <div className="user-selection-container">
        <div className="user-selection-header">
          <h1>💬 Real-Time Chat</h1>
          <p>Выберите свой профиль для начала общения</p>
        </div>
        
        <div className="users-grid">
          {users.map(user => (
            <div 
              key={user.id}
              className="user-card"
              onClick={() => onUserSelect(user)}
            >
              <img 
                src={user.avatar} 
                alt={user.name}
                className="user-avatar"
              />
              <div className="user-info">
                <h3>{user.name}</h3>
                <span className="username">@{user.username}</span>
                <p className="user-email">{user.email}</p>
                <div className="user-company">
                  {user.company.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserSelection;