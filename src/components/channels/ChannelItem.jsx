import React from 'react';

function ChannelItem({ channel, isActive, onSelect, currentUser }) {
  const isCreator = channel.creator === currentUser.id;
  
  return (
    <div
      className={`channel-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(channel)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onSelect(channel)}
    >
      <div className="channel-info">
        <span className="channel-prefix">#</span>
        <span className="channel-name">{channel.name}</span>
        {isCreator && <span className="admin-badge" title="Channel admin">👑</span>}
        {channel.isPrivate ? (
          <span className="private-badge" title="Private channel">🔒</span>
        ) : (
          <span className="public-badge" title="Public channel">🌐</span>
        )}
      </div>
      <div className="channel-meta">
        <span className="member-count">{channel.members.length} участников</span>
      </div>
    </div>
  );
}

export default ChannelItem;