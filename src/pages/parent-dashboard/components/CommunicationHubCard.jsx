import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CommunicationHubCard = ({ messages, onSendMessage, onMarkAsRead }) => {
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);

  const unreadCount = messages.filter(msg => !msg.read).length;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor((now - date) / (1000 * 60));
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getSenderTypeIcon = (senderType) => {
    switch (senderType) {
      case 'teacher': return 'GraduationCap';
      case 'admin': return 'Shield';
      case 'system': return 'Bell';
      default: return 'User';
    }
  };

  const getSenderTypeColor = (senderType) => {
    switch (senderType) {
      case 'teacher': return 'text-primary';
      case 'admin': return 'text-warning';
      case 'system': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      onSendMessage(selectedConversation.id, newMessage);
      setNewMessage('');
    }
  };

  const displayedMessages = showAllMessages ? messages : messages.slice(0, 3);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Messages</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        <Icon name="MessageCircle" size={20} color="var(--color-foreground)" />
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={48} color="var(--color-muted-foreground)" />
          <p className="text-muted-foreground mt-2">No messages yet</p>
          <p className="text-sm text-muted-foreground">Messages from teachers and school will appear here</p>
        </div>
      ) : (
        <>
          {/* Messages List */}
          <div className="space-y-4 mb-4">
            {displayedMessages.map((message) => (
              <div 
                key={message.id} 
                className={`border border-border rounded-lg p-4 cursor-pointer transition-all hover:shadow-soft ${
                  !message.read ? 'bg-muted/30 border-primary/20' : ''
                }`}
                onClick={() => {
                  setSelectedConversation(message);
                  if (!message.read) {
                    onMarkAsRead(message.id);
                  }
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Image
                      src={message.senderAvatar}
                      alt={message.senderName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card flex items-center justify-center ${
                      message.senderType === 'teacher' ? 'bg-primary' :
                      message.senderType === 'admin' ? 'bg-warning' : 'bg-muted-foreground'
                    }`}>
                      <Icon 
                        name={getSenderTypeIcon(message.senderType)} 
                        size={8} 
                        color="white" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-foreground">{message.senderName}</p>
                        <span className={`text-xs px-2 py-1 rounded-full bg-opacity-10 ${getSenderTypeColor(message.senderType)}`}>
                          {message.senderType}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                        {!message.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-foreground mb-1">{message.subject}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.preview}</p>
                    
                    {message.studentName && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Regarding: {message.studentName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {messages.length > 3 && (
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                iconName={showAllMessages ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                iconSize={16}
                onClick={() => setShowAllMessages(!showAllMessages)}
                className="w-full"
              >
                {showAllMessages ? 'Show Less' : `Show All Messages (${messages.length})`}
              </Button>
            </div>
          )}

          {/* Quick Reply Section */}
          {selectedConversation && (
            <div className="border-t border-border pt-4">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Reply" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm text-muted-foreground">
                  Reply to {selectedConversation.senderName}
                </span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  variant="default"
                  size="sm"
                  iconName="Send"
                  iconPosition="left"
                  iconSize={14}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          New Message
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Archive"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          View Archive
        </Button>
      </div>
    </div>
  );
};

export default CommunicationHubCard;