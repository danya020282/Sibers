import React, { useState } from 'react';
import UserSearch from '../users/UserSearch';
import Modal from '../ui/Modal';

function CreateChannelModal({ isOpen, onClose, onCreateChannel, currentUser }) {
  const [channelName, setChannelName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);

  const handleCreate = () => {
    if (channelName.trim()) {
      onCreateChannel(channelName.trim(), selectedUsers, isPrivate, description.trim());
      // Reset form
      setChannelName('');
      setSelectedUsers([]);
      setIsPrivate(false);
      setDescription('');
      setStep(1);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Channel">
      <div className="create-channel-content">
        {step === 1 && (
          <div className="create-channel-step">
            <div className="form-group">
              <label htmlFor="channel-name">Имя канала</label>
              <input
                id="channel-name"
                type="text"
                placeholder="например, project-discussion"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="channel-description">Описание (опционально)</label>
              <textarea
                id="channel-description"
                placeholder="О чем этот канал?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input"
                rows="3"
              />
            </div>
            
            <div className="privacy-toggle">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <span className="checkmark"></span>
                Приватный канал
              </label>
              <small>
                {isPrivate 
                  ? "Только приглашенные участники могут присоединиться" 
                  : "Любой может найти и присоединиться к этому каналу"
                }
              </small>
            </div>
            
            <button 
              className="btn btn-primary next-btn"
              onClick={() => setStep(2)}
              disabled={!channelName.trim()}
            >
              Далее → {isPrivate ? 'Пригласить участников' : 'Добавить участников'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="create-channel-step">
            <div className="form-group">
              <label>
                {isPrivate ? 'Пригласить участников' : 'Добавить начальных участников'} 
                ({selectedUsers.length} selected)
              </label>
              <UserSearch
                selectedUsers={selectedUsers}
                onUsersChange={setSelectedUsers}
                excludeUsers={[currentUser]}
              />
              {!isPrivate && (
                <small className="hint">
                  Примечание: Это общий канал - другие участники могут присоединиться без приглашения
                </small>
              )}
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                ← Назад
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCreate}
              >
                Создать канал
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CreateChannelModal;