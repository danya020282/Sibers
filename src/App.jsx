import React, { useState, useEffect } from 'react';
import UserSelection from './components/auth/UserSelection';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import usersData from './data/users.json';
import './styles/App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const savedChannels = JSON.parse(localStorage.getItem('chatChannels')) || [];
      const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
      
      if (savedChannels.length === 0) {
        const defaultChannels = [
          {
            id: 'general',
            name: 'General',
            creator: usersData[0].id,
            members: usersData.map(user => user.id),
            isPrivate: false,
            description: 'General discussion channel for everyone',
            createdAt: new Date().toISOString()
          }
        ];
        setChannels(defaultChannels);
        localStorage.setItem('chatChannels', JSON.stringify(defaultChannels));
      } else {
        // Filter out 'random' channel if it exists
        const filteredChannels = savedChannels.filter(channel => channel.id !== 'random');
        setChannels(filteredChannels);
        // Update localStorage if random channel was removed
        if (filteredChannels.length !== savedChannels.length) {
          localStorage.setItem('chatChannels', JSON.stringify(filteredChannels));
        }
      }
      
      setMessages(savedMessages);
    };

    loadData();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'chatMessages' && e.newValue) {
        try {
          const savedMessages = JSON.parse(e.newValue) || [];
          setMessages(savedMessages);
        } catch (error) {
          console.error('Error parsing messages from storage:', error);
        }
      }
      if (e.key === 'chatChannels' && e.newValue) {
        try {
          const savedChannels = JSON.parse(e.newValue) || [];
          const filteredChannels = savedChannels.filter(channel => channel.id !== 'random');
          setChannels(filteredChannels);
        } catch (error) {
          console.error('Error parsing channels from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('chatChannels', JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  /**
   * Create a new channel
   */
  const createChannel = (name, selectedUsers, isPrivate = false, description = '') => {
    const newChannel = {
      id: `channel-${Date.now()}`,
      name,
      creator: currentUser.id,
      members: [currentUser.id, ...selectedUsers.map(u => u.id)],
      isPrivate,
      description,
      createdAt: new Date().toISOString()
    };
    
    const updatedChannels = [...channels, newChannel];
    setChannels(updatedChannels);
    setActiveChannel(newChannel);
    return newChannel;
  };

  /**
   * Send a new message - ОБНОВЛЕНО: сообщения видны всем
   */
  const sendMessage = (text) => {
    if (!activeChannel || !text.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: text.trim(),
      userId: currentUser.id,
      channelId: activeChannel.id,
      timestamp: new Date().toISOString()
    };
    
    // Сообщения добавляются в общий список и видны всем
    // Используем функциональную форму setState для гарантии актуальности
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  /**
   * Join a public channel - ОБНОВЛЕНО: мгновенное обновление
   */
  const joinChannel = (channelId) => {
    const channelToJoin = channels.find(c => c.id === channelId);
    if (!channelToJoin || channelToJoin.isPrivate) return;
    
    // Сразу обновляем канал с новым участником
    const updatedChannel = {
      ...channelToJoin,
      members: [...new Set([...channelToJoin.members, currentUser.id])]
    };
    
    const updatedChannels = channels.map(channel => 
      channel.id === channelId ? updatedChannel : channel
    );
    
    setChannels(updatedChannels);
    setActiveChannel(updatedChannel); // Сразу переключаемся на чат
  };

  /**
   * Leave a channel
   */
  const leaveChannel = (channelId) => {
    const channelToLeave = channels.find(c => c.id === channelId);
    if (!channelToLeave || channelToLeave.isPrivate || channelToLeave.creator === currentUser.id) return;
    
    const updatedChannel = {
      ...channelToLeave,
      members: channelToLeave.members.filter(id => id !== currentUser.id)
    };
    
    const updatedChannels = channels.map(channel => 
      channel.id === channelId ? updatedChannel : channel
    );
    
    setChannels(updatedChannels);
    
    if (activeChannel?.id === channelId) {
      setActiveChannel(null);
    }
  };

  /**
   * Add user to channel (admin only)
   */
  const addUserToChannel = (channelId, userId) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId && channel.creator === currentUser.id
        ? { ...channel, members: [...new Set([...channel.members, userId])] }
        : channel
    ));
  };

  /**
   * Remove user from channel (admin only)
   */
  const removeUserFromChannel = (channelId, userId) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId && channel.creator === currentUser.id
        ? { ...channel, members: channel.members.filter(id => id !== userId) }
        : channel
    ));
  };

  // Get messages for active channel - ОБНОВЛЕНО: правильная фильтрация
  const channelMessages = messages.filter(msg => msg.channelId === activeChannel?.id);

  if (!currentUser) {
    return <UserSelection users={usersData} onUserSelect={setCurrentUser} />;
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleChannelSelect = (channel) => {
    setActiveChannel(channel);
    setIsMobileMenuOpen(false); // Close mobile menu when channel is selected
  };

  return (
    <div className="app">
      <Sidebar
        channels={channels}
        activeChannel={activeChannel}
        onChannelSelect={handleChannelSelect}
        currentUser={currentUser}
        onCreateChannel={createChannel}
        onJoinChannel={joinChannel}
        onLeaveChannel={leaveChannel}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
      />
      <MainContent
        activeChannel={activeChannel}
        messages={channelMessages}
        currentUser={currentUser}
        onSendMessage={sendMessage}
        onAddUser={addUserToChannel}
        onRemoveUser={removeUserFromChannel}
        allUsers={usersData}
        channels={channels}
        onMobileMenuToggle={handleMobileMenuToggle}
      />
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={handleMobileMenuToggle}></div>
      )}
    </div>
  );
}

export default App;