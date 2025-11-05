import React, { useState, useMemo } from 'react';
import UserItem from './UserItem';
import usersData from '../../data/users.json';

function UserSearch({ selectedUsers, onUsersChange, excludeUsers = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const availableUsers = useMemo(() => {
    return usersData.filter(user => 
      !excludeUsers.some(excluded => excluded.id === user.id) &&
      !selectedUsers.some(selected => selected.id === user.id)
    );
  }, [excludeUsers, selectedUsers]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return availableUsers.slice(0, 10);
    
    return availableUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableUsers, searchTerm]);

  const addUser = (user) => {
    onUsersChange([...selectedUsers, user]);
    setSearchTerm('');
  };

  const removeUser = (userId) => {
    onUsersChange(selectedUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="user-search">
      {/* Search input */}
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Поиск пользователей по имени, username, или email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Selected users */}
      {selectedUsers.length > 0 && (
        <div className="selected-users-section">
          <h5>Выбранные пользователи ({selectedUsers.length})</h5>
          <div className="selected-users-list">
            {selectedUsers.map(user => (
              <div key={user.id} className="selected-user-chip">
                <img src={user.avatar} alt={user.name} className="chip-avatar" />
                <span className="chip-name">{user.name}</span>
                <button 
                  onClick={() => removeUser(user.id)}
                  className="chip-remove"
                  aria-label={`Удалить ${user.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search results */}
      {searchTerm && (
        <div className="search-results">
          <div className="search-results-header">
            <h5>Результаты поиска</h5>
            <span className="results-count">{filteredUsers.length} пользователей найдено</span>
          </div>
          
          <div className="search-results-list">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                className="search-result-item"
                onClick={() => addUser(user)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && addUser(user)}
              >
                <UserItem user={user} />
              </div>
            ))}
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="no-results">
              <p>Пользователи, соответствующие "{searchTerm}" не найдены</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserSearch;