import React, { useState } from 'react';

/**
 * Component showing public channels available to join
 * Includes search functionality for finding channels
 */
function AvailableChannels({ channels, currentUser, onJoinChannel, onLeaveChannel }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAvailable, setShowAvailable] = useState(true);

  // Filter all public channels
  const allPublicChannels = channels.filter(channel => !channel.isPrivate);

  // Filter available channels: public + user is not a member
  const availableChannels = allPublicChannels.filter(channel => 
    !channel.members.includes(currentUser.id)
  );

  // Filter joined public channels (for leaving) - user is member but not creator
  const joinedChannels = allPublicChannels.filter(channel =>
    channel.members.includes(currentUser.id) && 
    channel.creator !== currentUser.id
  );

  // Filter channels based on search term
  const filteredAvailableChannels = availableChannels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (channel.description && channel.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredJoinedChannels = joinedChannels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (channel.description && channel.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (allPublicChannels.length === 0) {
    return (
      <div className="available-channels">
        <div className="section-header">
          <h3>Общие каналы</h3>
        </div>
        <div className="no-channels-info">
          <p>Общие каналы пока не доступны.</p>
          <p>Создайте один, чтобы начать разговор!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="available-channels">
      <div className="section-header">
        <h3>Общие каналы</h3>
        <div className="channel-search">
          <input
            type="text"
            placeholder="Поиск каналов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Available to join */}
      {filteredAvailableChannels.length > 0 && (
        <div className="available-section">
          <div className="section-subheader">
            <h4>Доступно для присоединения ({filteredAvailableChannels.length})</h4>
            <button 
              className="toggle-btn"
              onClick={() => setShowAvailable(!showAvailable)}
            >
              {showAvailable ? '▲' : '▼'}
            </button>
          </div>
          
          {showAvailable && (
            <div className="channels-list">
              {filteredAvailableChannels.map(channel => (
                <div key={channel.id} className="available-channel-item">
                  <div className="channel-info">
                    <div className="channel-main-info">
                      <span className="channel-name">#{channel.name}</span>
                      <span className="public-badge">Public</span>
                    </div>
                    {channel.description && (
                      <p className="channel-description">{channel.description}</p>
                    )}
                    <div className="channel-meta">
                      <span className="member-count">
                        👥 {channel.members.length} {channel.members.length === 1 ? 'member' : 'members'}
                      </span>
                      <span className="channel-created">
                        📅 {new Date(channel.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm join-btn"
                    onClick={() => onJoinChannel(channel.id)}
                  >
                    Присоединиться к каналу
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Joined public channels (can leave) */}
      {filteredJoinedChannels.length > 0 && (
        <div className="joined-section">
          <div className="section-subheader">
            <h4>Ваши общие каналы ({filteredJoinedChannels.length})</h4>
          </div>
          <div className="channels-list">
            {filteredJoinedChannels.map(channel => (
              <div key={channel.id} className="available-channel-item joined">
                <div className="channel-info">
                  <div className="channel-main-info">
                    <span className="channel-name">#{channel.name}</span>
                    <span className="public-badge">Public</span>
                    <span className="joined-badge">Joined</span>
                  </div>
                  {channel.description && (
                    <p className="channel-description">{channel.description}</p>
                  )}
                  <div className="channel-meta">
                    <span className="member-count">
                      👥 {channel.members.length} {channel.members.length === 1 ? 'member' : 'members'}
                    </span>
                  </div>
                </div>
                <button 
                  className="btn btn-outline btn-sm leave-btn"
                  onClick={() => onLeaveChannel(channel.id)}
                >
                  Покинуть    
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No results message */}
      {searchTerm && filteredAvailableChannels.length === 0 && filteredJoinedChannels.length === 0 && (
        <div className="no-results">
          <p>Каналы, соответствующие "{searchTerm}" не найдены</p>
        </div>
      )}
    </div>
  );
}

export default AvailableChannels;