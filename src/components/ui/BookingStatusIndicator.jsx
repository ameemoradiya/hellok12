import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const BookingStatusIndicator = ({ userRole = 'student', className = '' }) => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate role-based upcoming sessions
    const mockSessions = {
      student: [
        {
          id: 1,
          subject: 'English Literature',
          teacher: 'Ms. Smith',
          startTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
          duration: 60,
          status: 'starting-soon',
          type: 'video-call',
          meetingLink: 'https://meet.example.com/abc123'
        },
        {
          id: 2,
          subject: 'Mathematics',
          teacher: 'Mr. Johnson',
          startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
          duration: 45,
          status: 'scheduled',
          type: 'video-call'
        }
      ],
      parent: [
        {
          id: 1,
          subject: 'Piano Lesson',
          teacher: 'Ms. Davis',
          student: 'Emma',
          startTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
          duration: 60,
          status: 'confirmed',
          type: 'in-person',
          location: 'Music Room A'
        },
        {
          id: 2,
          subject: 'Math Tutoring',
          teacher: 'Dr. Wilson',
          student: 'Alex',
          startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
          duration: 90,
          status: 'pending-confirmation',
          type: 'video-call'
        }
      ],
      teacher: [
        {
          id: 1,
          subject: 'Science Lab',
          student: 'Multiple Students',
          startTime: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
          duration: 90,
          status: 'starting-soon',
          type: 'in-person',
          location: 'Lab Room 2',
          studentCount: 8
        },
        {
          id: 2,
          subject: 'History Discussion',
          student: 'Sarah Johnson',
          startTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
          duration: 45,
          status: 'scheduled',
          type: 'video-call'
        }
      ],
      admin: [
        {
          id: 1,
          type: 'meeting',
          title: 'Staff Meeting',
          participants: 'All Teachers',
          startTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
          duration: 60,
          status: 'scheduled',
          location: 'Conference Room'
        },
        {
          id: 2,
          type: 'review',
          title: 'Teacher Evaluation',
          participants: 'Ms. Smith',
          startTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
          duration: 30,
          status: 'scheduled',
          location: 'Office'
        }
      ]
    };

    setUpcomingSessions(mockSessions[userRole] || []);
  }, [userRole]);

  const getTimeUntilSession = (startTime) => {
    const diff = startTime.getTime() - currentTime.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m`;
    return 'Starting now';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'starting-soon': return 'text-warning';
      case 'confirmed': case'scheduled': return 'text-success';
      case 'pending-confirmation': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status, type) => {
    if (status === 'starting-soon') return 'Clock';
    if (type === 'video-call') return 'Video';
    if (type === 'in-person') return 'MapPin';
    if (type === 'meeting') return 'Users';
    return 'Calendar';
  };

  const handleJoinSession = (session) => {
    if (session.meetingLink) {
      window.open(session.meetingLink, '_blank');
    }
  };

  const nextSession = upcomingSessions[0];

  if (!nextSession) {
    return (
      <div className={`bg-card rounded-lg border border-border p-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-muted-foreground)" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">No upcoming sessions</h3>
            <p className="text-sm text-muted-foreground">Your schedule is clear</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg border border-border p-4 ${className}`}>
      {/* Next Session */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            nextSession.status === 'starting-soon' ? 'bg-warning/10' : 'bg-primary/10'
          }`}>
            <Icon 
              name={getStatusIcon(nextSession.status, nextSession.type)} 
              size={20} 
              color={nextSession.status === 'starting-soon' ? 'var(--color-warning)' : 'var(--color-primary)'} 
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground">
              {nextSession.subject || nextSession.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {userRole === 'student' && `with ${nextSession.teacher}`}
              {userRole === 'parent' && `${nextSession.student} with ${nextSession.teacher}`}
              {userRole === 'teacher' && `with ${nextSession.student}`}
              {userRole === 'admin' && nextSession.participants}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-sm font-medium ${getStatusColor(nextSession.status)}`}>
            {getTimeUntilSession(nextSession.startTime)}
          </div>
          <div className="text-xs text-muted-foreground">
            {nextSession.startTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>

      {/* Session Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Duration:</span>
          <span className="text-foreground">{nextSession.duration} minutes</span>
        </div>
        
        {nextSession.location && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Location:</span>
            <span className="text-foreground">{nextSession.location}</span>
          </div>
        )}
        
        {nextSession.studentCount && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Students:</span>
            <span className="text-foreground">{nextSession.studentCount}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {nextSession.status === 'starting-soon' && nextSession.meetingLink && (
          <Button
            variant="default"
            size="sm"
            iconName="Video"
            iconPosition="left"
            iconSize={16}
            onClick={() => handleJoinSession(nextSession)}
            className="flex-1"
          >
            Join Now
          </Button>
        )}
        
        {nextSession.status === 'pending-confirmation' && userRole === 'teacher' && (
          <>
            <Button
              variant="default"
              size="sm"
              className="flex-1"
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Reschedule
            </Button>
          </>
        )}
        
        <Button
          variant="outline"
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          iconSize={16}
          className={nextSession.meetingLink ? '' : 'flex-1'}
        >
          View Schedule
        </Button>
      </div>

      {/* Additional Sessions Count */}
      {upcomingSessions.length > 1 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            +{upcomingSessions.length - 1} more session{upcomingSessions.length > 2 ? 's' : ''} today
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingStatusIndicator;