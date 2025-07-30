import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import BookingStatusIndicator from '../../components/ui/BookingStatusIndicator';
import NotificationCenter from '../../components/ui/NotificationCenter';
import TeacherProfileCard from './components/TeacherProfileCard';
import EarningsSummary from './components/EarningsSummary';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import TodaySchedule from './components/TodaySchedule';
import BookingRequests from './components/BookingRequests';
import StudentFeedback from './components/StudentFeedback';
import StudentRoster from './components/StudentRoster';
import QuickActions from './components/QuickActions';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock teacher data
  const [teacherData] = useState({
    id: 'teacher-001',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    subjects: ['English Literature', 'Creative Writing'],
    rating: 4.8,
    totalReviews: 127,
    totalStudents: 45,
    completedSessions: 312,
    experience: 8,
    languages: 3,
    bio: `Passionate English teacher with 8 years of experience in language instruction. Specializes in creative writing and literature analysis. Committed to helping students develop strong communication skills and a love for reading.`
  });

  // Mock earnings data
  const [earningsData] = useState({
    'this-week': {
      gross: 485,
      net: 388,
      commission: 97,
      processingFee: 12,
      nextPayout: 376,
      hours: 18,
      hourlyRate: 27
    },
    'this-month': {
      gross: 2340,
      net: 1872,
      commission: 468,
      processingFee: 58,
      nextPayout: 1814,
      hours: 78,
      hourlyRate: 30
    },
    'last-month': {
      gross: 2180,
      net: 1744,
      commission: 436,
      processingFee: 54,
      nextPayout: 1690,
      hours: 72,
      hourlyRate: 30
    },
    'this-year': {
      gross: 24800,
      net: 19840,
      commission: 4960,
      processingFee: 620,
      nextPayout: 19220,
      hours: 826,
      hourlyRate: 30
    }
  });

  // Mock availability data
  const [availability, setAvailability] = useState({
    mon: ['09:00', '10:00', '14:00', '15:00', '16:00'],
    tue: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    wed: ['10:00', '11:00', '14:00', '15:00', '16:00'],
    thu: ['09:00', '10:00', '14:00', '15:00'],
    fri: ['09:00', '10:00', '11:00', '14:00'],
    sat: ['10:00', '11:00'],
    sun: []
  });

  // Mock today's sessions
  const [todaySessions] = useState([
    {
      id: 'session-001',
      student: {
        id: 'student-001',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
      },
      subject: 'English Literature',
      startTime: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      duration: 60,
      type: 'Video Call',
      earnings: 45,
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 'session-002',
      student: {
        id: 'student-002',
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      },
      subject: 'Creative Writing',
      startTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      duration: 45,
      type: 'Video Call',
      earnings: 38
    },
    {
      id: 'session-003',
      student: {
        id: 'student-003',
        name: 'Sophia Martinez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
      },
      subject: 'English Literature',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago (completed)
      duration: 60,
      type: 'Video Call',
      earnings: 45
    }
  ]);

  // Mock booking requests
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 'request-001',
      student: {
        id: 'student-004',
        name: 'Michael Brown',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      },
      subject: 'English Literature',
      preferredDate: 'December 16, 2024',
      preferredTime: '2:00 PM - 3:00 PM',
      duration: 60,
      sessionRate: 45,
      sessionType: 'video-call',
      urgency: 'high',
      requestedAt: '2 hours ago',
      recurring: true,
      recurringPattern: 'Weekly (Mondays)',
      message: `Hi Ms. Johnson! I'm struggling with Shakespeare analysis and would love your help. I have an exam coming up next week and need to understand the themes in Hamlet better.`
    },
    {
      id: 'request-002',
      student: {
        id: 'student-005',name: 'Isabella Davis',avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
      },
      subject: 'Creative Writing',preferredDate: 'December 17, 2024',preferredTime: '4:00 PM - 5:00 PM',duration: 60,sessionRate: 45,sessionType: 'video-call',urgency: 'medium',requestedAt: '5 hours ago',recurring: false,message: `I'm working on a short story for my portfolio and would appreciate feedback on my draft. Looking forward to our session!`
    }
  ]);

  // Mock student feedback
  const [studentFeedbacks] = useState([
    {
      id: 'feedback-001',
      student: {
        id: 'student-001',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
      },
      subject: 'English Literature',
      rating: 5,
      comment: `Ms. Johnson is an amazing teacher! She helped me understand Shakespeare in a way that finally makes sense. Her explanations are clear and she's very patient with questions.`,
      date: '2024-12-14',
      sessionDate: 'December 14, 2024',
      tags: ['Patient', 'Clear Explanations', 'Knowledgeable'],
      parentFeedback: true
    },
    {
      id: 'feedback-002',
      student: {
        id: 'student-002',
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      },
      subject: 'Creative Writing',
      rating: 5,
      comment: `The creative writing session was fantastic! Ms. Johnson gave me great feedback on my story and helped me develop my characters better. I feel much more confident now.`,
      date: '2024-12-13',
      sessionDate: 'December 13, 2024',
      tags: ['Creative', 'Encouraging', 'Detailed Feedback']
    },
    {
      id: 'feedback-003',
      student: {
        id: 'student-003',
        name: 'Sophia Martinez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
      },
      subject: 'English Literature',
      rating: 4,
      comment: `Good session overall. Ms. Johnson knows her subject well and provided helpful insights into the themes we discussed. Would recommend!`,
      date: '2024-12-12',
      sessionDate: 'December 12, 2024',
      tags: ['Knowledgeable', 'Helpful']
    }
  ]);

  // Mock student roster
  const [studentRoster] = useState([
    {
      id: 'student-001',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      grade: 10,
      subjects: ['English Literature'],
      progress: 85,
      totalSessions: 24,
      lastSession: 'Today',
      completedHomework: '18/20',
      averageRating: 4.8,
      attendanceRate: 95,
      isOnline: true,
      recentActivity: 'Completed essay on Hamlet themes'
    },
    {
      id: 'student-002',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      grade: 11,
      subjects: ['Creative Writing'],
      progress: 92,
      totalSessions: 18,
      lastSession: 'Yesterday',
      completedHomework: '16/16',
      averageRating: 4.9,
      attendanceRate: 100,
      isOnline: false,
      recentActivity: 'Submitted short story draft'
    },
    {
      id: 'student-003',
      name: 'Sophia Martinez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      grade: 9,
      subjects: ['English Literature'],
      progress: 78,
      totalSessions: 15,
      lastSession: '2 days ago',
      completedHomework: '12/15',
      averageRating: 4.6,
      attendanceRate: 87,
      isOnline: true,
      recentActivity: 'Working on poetry analysis'
    }
  ]);

  // Event handlers
  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleJoinSession = (session) => {
    if (session.meetingLink) {
      window.open(session.meetingLink, '_blank');
    }
  };

  const handleCancelSession = (session) => {
    console.log('Cancel session:', session.id);
  };

  const handleApproveRequest = async (requestId) => {
    console.log('Approve request:', requestId);
    setBookingRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleRejectRequest = async (requestId) => {
    console.log('Reject request:', requestId);
    setBookingRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleViewAllFeedback = () => {
    console.log('View all feedback');
  };

  const handleViewStudentProfile = (student) => {
    console.log('View student profile:', student.id);
  };

  const handleMessageStudent = (student) => {
    console.log('Message student:', student.id);
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    switch (actionId) {
      case 'create-lesson':
        // Navigate to lesson creation
        break;
      case 'schedule-session': navigate('/booking-system');
        break;
      case 'upload-material':
        // Navigate to material upload
        break;
      case 'view-analytics':
        // Navigate to analytics
        break;
      case 'message-parents':
        // Navigate to messaging
        break;
      case 'generate-report':
        // Navigate to report generation
        break;
      default:
        break;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'students', label: 'Students', icon: 'Users' },
    { id: 'earnings', label: 'Earnings', icon: 'DollarSign' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 p-1 bg-muted rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm font-medium rounded transition-micro ${
                    activeTab === tab.id
                      ? 'bg-card text-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Sidebar */}
              <div className="col-span-3 space-y-6">
                <TeacherProfileCard 
                  teacher={teacherData} 
                  onEditProfile={handleEditProfile}
                />
                <BookingStatusIndicator userRole="teacher" />
                <AvailabilityCalendar 
                  availability={availability}
                  onUpdateAvailability={setAvailability}
                />
              </div>

              {/* Main Content */}
              <div className="col-span-6 space-y-6">
                <TodaySchedule 
                  sessions={todaySessions}
                  onJoinSession={handleJoinSession}
                  onCancelSession={handleCancelSession}
                />
                <BookingRequests 
                  requests={bookingRequests}
                  onApproveRequest={handleApproveRequest}
                  onRejectRequest={handleRejectRequest}
                />
                <QuickActions onAction={handleQuickAction} />
              </div>

              {/* Right Sidebar */}
              <div className="col-span-3 space-y-6">
                <EarningsSummary earnings={earningsData} />
                <StudentFeedback 
                  feedbacks={studentFeedbacks}
                  onViewAllFeedback={handleViewAllFeedback}
                />
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="lg:hidden">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <TeacherProfileCard 
                  teacher={teacherData} 
                  onEditProfile={handleEditProfile}
                />
                <BookingStatusIndicator userRole="teacher" />
                <TodaySchedule 
                  sessions={todaySessions}
                  onJoinSession={handleJoinSession}
                  onCancelSession={handleCancelSession}
                />
                <BookingRequests 
                  requests={bookingRequests}
                  onApproveRequest={handleApproveRequest}
                  onRejectRequest={handleRejectRequest}
                />
                <QuickActions onAction={handleQuickAction} />
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <AvailabilityCalendar 
                  availability={availability}
                  onUpdateAvailability={setAvailability}
                />
                <TodaySchedule 
                  sessions={todaySessions}
                  onJoinSession={handleJoinSession}
                  onCancelSession={handleCancelSession}
                />
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-6">
                <StudentRoster 
                  students={studentRoster}
                  onViewStudentProfile={handleViewStudentProfile}
                  onMessageStudent={handleMessageStudent}
                />
                <StudentFeedback 
                  feedbacks={studentFeedbacks}
                  onViewAllFeedback={handleViewAllFeedback}
                />
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <EarningsSummary earnings={earningsData} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        userRole="teacher"
      />
    </div>
  );
};

export default TeacherDashboard;