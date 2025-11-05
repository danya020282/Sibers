import React, { useState } from 'react';
import ChannelList from '../channels/ChannelList';
import AvailableChannels from '../channels/AvailableChannels';
import CreateChannelModal from '../channels/CreateChannelModal';

function Sidebar({ channels, activeChannel, onChannelSelect, currentUser, onCreateChannel, onJoinChannel, onLeaveChannel, isMobileMenuOpen, onMobileMenuToggle }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="current-user">
          <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
          <div className="user-details">
            <strong>{currentUser.name}</strong>
            <span className="user-status">Online</span>
          </div>
        </div>
      </div>

      <div className="sidebar-content">
        {/* Available public channels */}
        <AvailableChannels
          channels={channels}
          currentUser={currentUser}
          onJoinChannel={(channelId) => {
            onJoinChannel(channelId);
            onMobileMenuToggle(); // Close menu when joining
          }}
          onLeaveChannel={onLeaveChannel}
        />

        {/* User's channels */}
        <div className="channels-section">
          <div className="section-header">
            <h3>Ваши каналы</h3>
            <button 
              className="create-channel-btn"
              onClick={() => setIsCreateModalOpen(true)}
              aria-label="Create new channel"
            >
              +
            </button>
          </div>
          <ChannelList
            channels={channels}
            activeChannel={activeChannel}
            onChannelSelect={onChannelSelect}
            currentUser={currentUser}
          />
        </div>
      </div>

      <CreateChannelModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateChannel={onCreateChannel}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Sidebar;