import React, { useState, useEffect } from 'react';
import UserSearch from './UserSearch';

/**
 * User management component for channel admins
 * Now properly updates when users are added/removed
 */
function UserManagement({ channel, currentUser, onAddUser, onRemoveUser, allUsers }) {
  const [currentChannel, setCurrentChannel] = useState(channel);
  const isAdmin = currentChannel.creator === currentUser.id;
  
  // Sync with parent component state changes
  useEffect(() => {
    setCurrentChannel(channel);
  }, [channel]);

  // Get current channel members with full user objects
  const channelMembers = allUsers.filter(user => 
    currentChannel.members.includes(user.id)
  );

  /**
   * Handle adding a new user to channel
   * @param {Array} users - Users to add
   */
  const handleAddUser = (users) => {
    if (users.length > 0) {
      onAddUser(currentChannel.id, users[0].id);
      // Force immediate UI update
      setCurrentChannel(prev => ({
        ...prev,
        members: [...prev.members, users[0].id]
      }));
    }
  };

  /**
   * Handle removing user from channel
   * @param {number} userId - User ID to remove
   */
  const handleRemoveUser = (userId) => {
    onRemoveUser(currentChannel.id, userId);
    // Force immediate UI update
    setCurrentChannel(prev => ({
      ...prev,
      members: prev.members.filter(id => id !== userId)
    }));
  };

  if (!isAdmin) {
    return (
      <div className="user-management">
        <h4>Участники канала ({channelMembers.length})</h4>
        <div className="members-list">
          {channelMembers.map(member => (
            <div key={member.id} className="member-item">
              <img src={member.avatar} alt={member.name} />
              <span>{member.name}</span>
              {member.id === currentChannel.creator && (
                <span className="admin-label">Администратор</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      {/* Add members section */}
      <div className="add-members-section">
        <h4>Добавить участников в канал</h4>
        <UserSearch
          selectedUsers={[]}
          onUsersChange={handleAddUser}
          excludeUsers={channelMembers}
        />
      </div>

      {/* Current members section */}
      <div className="current-members">
        <h4>Участники канала ({channelMembers.length})</h4>
        <div className="members-list">
          {channelMembers.map(member => (
            <div key={member.id} className="member-item">
              <img src={member.avatar} alt={member.name} className="member-avatar" />
              <div className="member-info">
                <span className="member-name">{member.name}</span>
                <span className="member-username">@{member.username}</span>
              </div>
              <div className="member-actions">
                {member.id === currentChannel.creator && (
                  <span className="admin-badge">Администратор</span>
                )}
                {member.id !== currentUser.id && (
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveUser(member.id)}
                    title={`Удалить ${member.name} из канала`}
                  >
                    Удалить
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;