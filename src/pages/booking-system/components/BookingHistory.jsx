import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookingHistory = ({ userRole = 'student' }) => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    // Mock booking data based on user role
    const mockBookings = [
      {
        id: 'BK001',
        teacher: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
          rating: 4.9
        },
        student: userRole === 'parent' ? 'Emma Wilson' : null,
        subject: 'English Literature',
        sessionType: 'individual',
        date: new Date('2024-12-15T15:00:00'),
        duration: 60,
        status: 'upcoming',
        price: 25,
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        canCancel: true,
        canReschedule: true,
        isRecurring: false
      },
      {
        id: 'BK002',
        teacher: {
          name: 'Michael Chen',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          rating: 4.8
        },
        student: userRole === 'parent' ? 'Alex Wilson' : null,
        subject: 'Mathematics',
        sessionType: 'group',
        date: new Date('2024-12-10T14:00:00'),
        duration: 60,
        status: 'completed',
        price: 15,
        rating: 5,
        feedback: 'Excellent session! Very helpful explanations.',
        isRecurring: true,
        recurringInfo: 'Weekly sessions'
      },
      {
        id: 'BK003',
        teacher: {
          name: 'Lisa Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          rating: 4.7
        },
        student: userRole === 'parent' ? 'Emma Wilson' : null,
        subject: 'Spanish Conversation',
        sessionType: 'individual',
        date: new Date('2024-12-08T16:30:00'),
        duration: 90,
        status: 'cancelled',
        price: 35,
        cancellationReason: 'Teacher unavailable',
        refundStatus: 'processed',
        isRecurring: false
      },
      {
        id: 'BK004',
        teacher: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          rating: 4.9
        },
        student: userRole === 'parent' ? 'Alex Wilson' : null,
        subject: 'Physics',
        sessionType: 'intensive',
        date: new Date('2024-12-20T10:00:00'),
        duration: 120,
        status: 'upcoming',
        price: 45,
        meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
        canCancel: true,
        canReschedule: true,
        isRecurring: false
      },
      {
        id: 'BK005',
        teacher: {
          name: 'Emma Thompson',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          rating: 4.8
        },
        student: userRole === 'parent' ? 'Emma Wilson' : null,
        subject: 'French Grammar',
        sessionType: 'individual',
        date: new Date('2024-11-28T13:00:00'),
        duration: 60,
        status: 'completed',
        price: 25,
        rating: 4,
        feedback: 'Good session, would like more practice exercises.',
        isRecurring: false
      }
    ];

    setBookings(mockBookings);
  }, [userRole]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-primary';
      case 'completed': return 'text-success';
      case 'cancelled': return 'text-error';
      case 'in-progress': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'cancelled': return 'XCircle';
      case 'in-progress': return 'Play';
      default: return 'Circle';
    }
  };

  const getSessionTypeIcon = (type) => {
    switch (type) {
      case 'individual': return 'User';
      case 'group': return 'Users';
      case 'intensive': return 'Zap';
      default: return 'BookOpen';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'price-desc':
        return b.price - a.price;
      case 'price-asc':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const handleCancelBooking = (bookingId) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled', canCancel: false, canReschedule: false }
        : booking
    ));
  };

  const handleJoinSession = (meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  const filterOptions = [
    { value: 'all', label: 'All Sessions', count: bookings.length },
    { value: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'upcoming').length },
    { value: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { value: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'price-desc', label: 'Highest Price' },
    { value: 'price-asc', label: 'Lowest Price' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Booking History</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-micro ${
                filter === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg bg-input text-foreground"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {sortedBookings.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" />
            <h4 className="text-lg font-medium text-foreground mt-4">No bookings found</h4>
            <p className="text-muted-foreground mt-2">
              {filter === 'all' ? "You haven't booked any sessions yet." 
                : `No ${filter} sessions found.`}
            </p>
            <Button
              variant="default"
              size="sm"
              className="mt-4"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Book Your First Session
            </Button>
          </div>
        ) : (
          sortedBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 border border-border rounded-lg hover:shadow-soft transition-micro"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src={booking.teacher.avatar}
                    alt={booking.teacher.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{booking.teacher.name}</h4>
                    <p className="text-sm text-muted-foreground">{booking.subject}</p>
                    {userRole === 'parent' && booking.student && (
                      <p className="text-xs text-muted-foreground">Student: {booking.student}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                    <Icon name={getStatusIcon(booking.status)} size={16} />
                    <span className="text-sm font-medium capitalize">{booking.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                  <div>
                    <div className="text-sm text-foreground">
                      {booking.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {booking.date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Icon name={getSessionTypeIcon(booking.sessionType)} size={16} color="var(--color-muted-foreground)" />
                  <div>
                    <div className="text-sm text-foreground capitalize">{booking.sessionType}</div>
                    <div className="text-xs text-muted-foreground">{booking.duration} minutes</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Icon name="DollarSign" size={16} color="var(--color-muted-foreground)" />
                  <div>
                    <div className="text-sm text-foreground">${booking.price}</div>
                    {booking.isRecurring && (
                      <div className="text-xs text-success">{booking.recurringInfo}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} color="var(--color-warning)" />
                  <div>
                    <div className="text-sm text-foreground">{booking.teacher.rating}</div>
                    <div className="text-xs text-muted-foreground">Teacher Rating</div>
                  </div>
                </div>
              </div>

              {/* Session Rating & Feedback */}
              {booking.status === 'completed' && booking.rating && (
                <div className="p-3 bg-muted/50 rounded-lg mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-foreground">Your Rating:</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={14}
                          color={star <= booking.rating ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
                        />
                      ))}
                    </div>
                  </div>
                  {booking.feedback && (
                    <p className="text-sm text-muted-foreground italic">"{booking.feedback}"</p>
                  )}
                </div>
              )}

              {/* Cancellation Info */}
              {booking.status === 'cancelled' && (
                <div className="p-3 bg-error/10 rounded-lg mb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Info" size={16} color="var(--color-error)" />
                    <span className="text-sm font-medium text-error">Cancelled</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reason: {booking.cancellationReason}
                  </p>
                  {booking.refundStatus && (
                    <p className="text-sm text-success mt-1">
                      Refund: {booking.refundStatus}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {booking.status === 'upcoming' && booking.meetingLink && (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Video"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleJoinSession(booking.meetingLink)}
                  >
                    Join Session
                  </Button>
                )}

                {booking.canReschedule && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Reschedule
                  </Button>
                )}

                {booking.canCancel && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel
                  </Button>
                )}

                {booking.status === 'completed' && !booking.rating && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Star"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Rate Session
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                >
                  Receipt
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  iconSize={16}
                >
                  Message Teacher
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {sortedBookings.length > 0 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}
          >
            Load More Sessions
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;