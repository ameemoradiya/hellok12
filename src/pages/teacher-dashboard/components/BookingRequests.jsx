import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingRequests = ({ requests, onApproveRequest, onRejectRequest }) => {
  const [processingRequests, setProcessingRequests] = useState(new Set());

  const handleApprove = async (requestId) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      await onApproveRequest(requestId);
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleReject = async (requestId) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      await onRejectRequest(requestId);
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      default: return 'text-success';
    }
  };

  const getUrgencyBg = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-error/10';
      case 'medium': return 'bg-warning/10';
      default: return 'bg-success/10';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Booking Requests</h3>
        {requests.length > 0 && (
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
            {requests.length} pending
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" />
          <p className="text-muted-foreground mt-2">No pending requests</p>
          <p className="text-sm text-muted-foreground">All caught up!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className={`p-4 rounded-lg border transition-micro ${getUrgencyBg(request.urgency)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Image
                    src={request.student.avatar}
                    alt={request.student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{request.student.name}</h4>
                    <p className="text-sm text-muted-foreground">{request.subject}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency.toUpperCase()} PRIORITY
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Requested {request.requestedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    ${request.sessionRate}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {request.duration} minutes
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Preferred Date:</span>
                  <span className="text-foreground">{request.preferredDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Preferred Time:</span>
                  <span className="text-foreground">{request.preferredTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Session Type:</span>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={request.sessionType === 'video-call' ? 'Video' : 'MapPin'} 
                      size={14} 
                      color="var(--color-muted-foreground)" 
                    />
                    <span className="text-foreground capitalize">{request.sessionType.replace('-', ' ')}</span>
                  </div>
                </div>
                {request.recurring && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Recurring:</span>
                    <span className="text-primary font-medium">{request.recurringPattern}</span>
                  </div>
                )}
              </div>

              {request.message && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground">{request.message}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => handleApprove(request.id)}
                  loading={processingRequests.has(request.id)}
                  disabled={processingRequests.has(request.id)}
                  className="flex-1"
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => handleReject(request.id)}
                  loading={processingRequests.has(request.id)}
                  disabled={processingRequests.has(request.id)}
                  className="flex-1 text-destructive hover:text-destructive"
                >
                  Reject
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MessageCircle"
                  iconSize={16}
                  disabled={processingRequests.has(request.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingRequests;