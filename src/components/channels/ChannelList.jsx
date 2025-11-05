import React, { useMemo } from 'react';
import ChannelItem from './ChannelItem';

/**
 * Renders list of channels that current user is member of
 * Fixed: Uses useMemo for proper filtering
 */
function ChannelList({ channels, activeChannel, onChannelSelect, currentUser }) {
  // Filter channels where current user is a member
  const userChannels = useMemo(() => {
    return channels.filter(channel => 
      channel.members.includes(currentUser.id)
    );
  }, [channels, currentUser.id]);

  return (
    <div className="channel-list">
      {userChannels.map(channel => (
        <ChannelItem
          key={channel.id}
          channel={channel}
          isActive={activeChannel?.id === channel.id}
          onSelect={onChannelSelect}
          currentUser={currentUser}
        />
      ))}
      
      {/* Empty state */}
      {userChannels.length === 0 && (
        <div className="no-channels">
          <p>Каналы пока не созданы. Создайте один, чтобы начать разговор!</p>
        </div>
      )}
    </div>
  );
}

export default ChannelList;