import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingSessionsCard = ({ sessions, onReschedule, onCancel, onJoin }) => {
  const getSessionStatus = (session) => {
    const now = new Date();
    const sessionTime = new Date(session.dateTime);
    const timeDiff = sessionTime.getTime() - now.getTime();
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));

    if (minutesDiff <= 15 && minutesDiff > 0) return 'starting-soon';
    if (minutesDiff <= 0 && minutesDiff > -60) return 'ongoing';
    if (session.status === 'confirmed') return 'confirmed';
    return session.status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'starting-soon': return 'text-warning';
      case 'ongoing': return 'text-success';
      case 'confirmed': return 'text-primary';
      case 'pending': return 'text-accent';
      case 'cancelled': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'starting-soon': return 'Clock';
      case 'ongoing': return 'Video';
      case 'confirmed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'cancelled': return 'XCircle';
      default: return 'Calendar';
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateStr;
    if (date.toDateString() === today.toDateString()) {
      dateStr = 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dateStr = 'Tomorrow';
    } else {
      dateStr = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }

    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    return `${dateStr} at ${timeStr}`;
  };

  if (!sessions || sessions.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Sessions</h3>
          <Icon name="Calendar" size={20} color="var(--color-muted-foreground)" />
        </div>
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" />
          <p className="text-muted-foreground mt-2">No upcoming sessions</p>
          <p className="text-sm text-muted-foreground">Book a session to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Sessions</h3>
        <span className="text-sm text-muted-foreground">{sessions.length} session{sessions.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="space-y-4">
        {sessions.slice(0, 3).map((session) => {
          const status = getSessionStatus(session);
          
          return (
            <div key={session.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{session.subject}</h4>
                    <div className={`flex items-center space-x-1 ${getStatusColor(status)}`}>
                      <Icon name={getStatusIcon(status)} size={14} />
                      <span className="text-xs font-medium capitalize">
                        {status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    with {session.teacher} • {session.duration} minutes
                  </p>
                  <p className="text-sm text-foreground">
                    {formatDateTime(session.dateTime)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Student: {session.studentName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {status === 'starting-soon' && (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Video"
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => onJoin(session)}
                  >
                    Join Now
                  </Button>
                )}
                
                {status === 'ongoing' && (
                  <Button
                    variant="success"
                    size="sm"
                    iconName="Video"
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => onJoin(session)}
                  >
                    Join Session
                  </Button>
                )}

                {(status === 'confirmed' || status === 'pending') && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Calendar"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => onReschedule(session)}
                    >
                      Reschedule
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => onCancel(session)}
                      className="text-error hover:text-error"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {sessions.length > 3 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={16}
            className="w-full"
          >
            View All Sessions ({sessions.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingSessionsCard;