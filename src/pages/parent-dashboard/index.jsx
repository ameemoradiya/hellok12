import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NotificationCenter from '../../components/ui/NotificationCenter';
import BookingStatusIndicator from '../../components/ui/BookingStatusIndicator';
import RoleContextSwitcher from '../../components/ui/RoleContextSwitcher';
import ChildProfileCard from './components/ChildProfileCard';
import UpcomingSessionsCard from './components/UpcomingSessionsCard';
import PaymentManagementCard from './components/PaymentManagementCard';
import ProgressTrackingCard from './components/ProgressTrackingCard';
import CommunicationHubCard from './components/CommunicationHubCard';
import QuickActionsCard from './components/QuickActionsCard';

import Button from '../../components/ui/Button';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [children, setChildren] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Mock data for children
    const mockChildren = [
      {
        id: 1,
        name: "Emma Johnson",
        age: 10,
        grade: "5th Grade",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        isOnline: true,
        overallProgress: 85,
        subjects: ["English Literature", "Spanish", "Mathematics"],
        nextSession: {
          subject: "English Literature",
          time: "Today 3:00 PM",
          teacher: "Ms. Smith"
        },
        stats: {
          completedSessions: 24,
          hoursLearned: 36,
          achievements: 8
        }
      },
      {
        id: 2,
        name: "Alex Johnson",
        age: 8,
        grade: "3rd Grade",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        isOnline: false,
        overallProgress: 92,
        subjects: ["Reading", "Science", "Art"],
        nextSession: {
          subject: "Science",
          time: "Tomorrow 4:00 PM",
          teacher: "Mr. Davis"
        },
        stats: {
          completedSessions: 18,
          hoursLearned: 27,
          achievements: 12
        }
      },
      {
        id: 3,
        name: "Sophia Johnson",
        age: 12,
        grade: "7th Grade",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        isOnline: true,
        overallProgress: 78,
        subjects: ["Advanced Mathematics", "Physics", "French"],
        nextSession: {
          subject: "Physics",
          time: "Friday 2:00 PM",
          teacher: "Dr. Wilson"
        },
        stats: {
          completedSessions: 31,
          hoursLearned: 52,
          achievements: 15
        }
      }
    ];

    // Mock upcoming sessions
    const mockSessions = [
      {
        id: 1,
        subject: "English Literature",
        teacher: "Ms. Smith",
        studentName: "Emma Johnson",
        dateTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        duration: 60,
        status: "confirmed",
        meetingLink: "https://meet.google.com/abc-defg-hij"
      },
      {
        id: 2,
        subject: "Science",
        teacher: "Mr. Davis",
        studentName: "Alex Johnson",
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 45,
        status: "confirmed"
      },
      {
        id: 3,
        subject: "Physics",
        teacher: "Dr. Wilson",
        studentName: "Sophia Johnson",
        dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        duration: 90,
        status: "pending"
      }
    ];

    // Mock payment data
    const mockPaymentData = {
      subscription: {
        plan: "Family Premium",
        amount: 89,
        interval: "month",
        status: "active",
        nextBilling: "2025-08-30"
      },
      paymentMethod: {
        brand: "visa",
        last4: "4242",
        expiry: "12/26"
      },
      upcomingCharges: [
        {
          description: "Family Premium Subscription",
          amount: 89,
          dueDate: "2025-08-30"
        }
      ],
      transactions: [
        {
          id: 1,
          description: "Family Premium - July 2025",
          amount: 89,
          date: "2025-07-01",
          status: "completed",
          invoiceUrl: "/invoices/july-2025.pdf"
        },
        {
          id: 2,
          description: "Additional Session - Emma",
          amount: 25,
          date: "2025-07-15",
          status: "completed"
        },
        {
          id: 3,
          description: "Family Premium - August 2025",
          amount: 89,
          date: "2025-07-30",
          status: "pending"
        }
      ]
    };

    // Mock progress data
    const mockProgressData = {
      overall: {
        percentage: 85,
        completedSessions: 24,
        totalHours: 36
      },
      subjects: [
        {
          name: "English Literature",
          level: "intermediate",
          progress: 85,
          completedLessons: 17,
          totalLessons: 20,
          lastSession: "2025-07-28"
        },
        {
          name: "Spanish",
          level: "beginner",
          progress: 65,
          completedLessons: 13,
          totalLessons: 20,
          lastSession: "2025-07-26"
        },
        {
          name: "Mathematics",
          level: "advanced",
          progress: 92,
          completedLessons: 23,
          totalLessons: 25,
          lastSession: "2025-07-29"
        }
      ],
      achievements: [
        {
          title: "Reading Champion",
          description: "Completed 20 reading sessions",
          date: "2025-07-25"
        },
        {
          title: "Perfect Attendance",
          description: "Attended all sessions this month",
          date: "2025-07-20"
        },
        {
          title: "Quick Learner",
          description: "Mastered 5 new concepts",
          date: "2025-07-18"
        }
      ],
      streak: {
        current: 12,
        best: 18
      },
      recentFeedback: {
        teacher: "Ms. Smith",
        subject: "English Literature",
        rating: 5,
        comment: "Emma shows excellent comprehension and actively participates in discussions. Her writing skills have improved significantly.",
        date: "2025-07-28"
      }
    };

    // Mock messages
    const mockMessages = [
      {
        id: 1,
        senderName: "Ms. Smith",
        senderType: "teacher",
        senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        subject: "Emma\'s Progress Update",
        preview: "I wanted to share some exciting news about Emma\'s progress in our English Literature sessions...",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        studentName: "Emma Johnson"
      },
      {
        id: 2,
        senderName: "School Administrator",
        senderType: "admin",
        senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        subject: "Schedule Change Notification",
        preview: "We need to reschedule Alex\'s Science session due to teacher availability...",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: false,
        studentName: "Alex Johnson"
      },
      {
        id: 3,
        senderName: "Dr. Wilson",
        senderType: "teacher",
        senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        subject: "Physics Assignment Feedback",
        preview: "Sophia did an excellent job on her recent physics assignment. Here\'s my detailed feedback...",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        studentName: "Sophia Johnson"
      }
    ];

    setChildren(mockChildren);
    setUpcomingSessions(mockSessions);
    setPaymentData(mockPaymentData);
    setProgressData(mockProgressData);
    setMessages(mockMessages);
    setSelectedChild(mockChildren[0]); // Select first child by default
  }, []);

  const handleChildSelect = (child) => {
    setSelectedChild(child);
  };

  const handleBookSession = (child) => {
    navigate('/booking-system', { state: { selectedChild: child } });
  };

  const handleManageBookings = () => {
    navigate('/booking-system', { state: { tab: 'manage' } });
  };

  const handleRescheduleSession = (session) => {
    navigate('/booking-system', { state: { rescheduleSession: session } });
  };

  const handleCancelSession = (session) => {
    // Mock cancel session
    setUpcomingSessions(prev => prev.filter(s => s.id !== session.id));
  };

  const handleJoinSession = (session) => {
    if (session.meetingLink) {
      window.open(session.meetingLink, '_blank');
    }
  };

  const handleUpdatePayment = () => {
    // Mock payment update
    console.log('Update payment method');
  };

  const handleViewInvoice = (transaction) => {
    // Mock invoice view
    console.log('View invoice:', transaction);
  };

  const handleSendMessage = (conversationId, message) => {
    // Mock send message
    console.log('Send message:', conversationId, message);
  };

  const handleMarkAsRead = (messageId) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const handleViewProgress = () => {
    // Mock view detailed progress
    console.log('View detailed progress');
  };

  const handleShareReferral = () => {
    // Mock share referral
    console.log('Share referral');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Parent Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your children's learning journey and track their progress
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <RoleContextSwitcher 
                  userRole="parent" 
                  className="hidden lg:block"
                />
                
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="Bell"
                    iconSize={20}
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative"
                  />
                  {messages.filter(m => !m.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {messages.filter(m => !m.read).length}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => handleBookSession(selectedChild)}
                >
                  Book Session
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Context Switcher */}
          <div className="lg:hidden mb-6">
            <RoleContextSwitcher userRole="parent" />
          </div>

          {/* Children Profile Cards */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Children</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <ChildProfileCard
                  key={child.id}
                  child={child}
                  isActive={selectedChild?.id === child.id}
                  onSelect={() => handleChildSelect(child)}
                  onBookSession={() => handleBookSession(child)}
                />
              ))}
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Booking Status */}
              <BookingStatusIndicator userRole="parent" />
              
              {/* Upcoming Sessions */}
              <UpcomingSessionsCard
                sessions={upcomingSessions}
                onReschedule={handleRescheduleSession}
                onCancel={handleCancelSession}
                onJoin={handleJoinSession}
              />
              
              {/* Progress Tracking */}
              <ProgressTrackingCard
                selectedChild={selectedChild}
                progressData={selectedChild ? progressData : null}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <QuickActionsCard
                selectedChild={selectedChild}
                onBookSession={() => handleBookSession(selectedChild)}
                onManageBookings={handleManageBookings}
                onViewProgress={handleViewProgress}
                onShareReferral={handleShareReferral}
              />
              
              {/* Payment Management */}
              <PaymentManagementCard
                paymentData={paymentData}
                onUpdatePayment={handleUpdatePayment}
                onViewInvoice={handleViewInvoice}
              />
              
              {/* Communication Hub */}
              <CommunicationHubCard
                messages={messages}
                onSendMessage={handleSendMessage}
                onMarkAsRead={handleMarkAsRead}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        userRole="parent"
      />
    </div>
  );
};

export default ParentDashboard;