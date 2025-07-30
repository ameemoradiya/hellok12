import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NotificationCenter from '../../components/ui/NotificationCenter';
import BookingStatusIndicator from '../../components/ui/BookingStatusIndicator';
import UpcomingSessionsCard from './components/UpcomingSessionsCard';
import ProgressTrackingSection from './components/ProgressTrackingSection';
import QuickAccessTiles from './components/QuickAccessTiles';
import ScheduleWidget from './components/ScheduleWidget';
import RecentFeedbackCard from './components/RecentFeedbackCard';
import GamificationElements from './components/GamificationElements';
import MobileBottomNavigation from './components/MobileBottomNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [studentData, setStudentData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Mock student data
    const mockStudentData = {
      name: "Alex Johnson",
      grade: "5th Grade",
      school: "Riverside Elementary",
      avatar: "/assets/images/student-avatar.jpg",
      currentLevel: 12,
      xpPoints: 2450,
      learningStreak: 7,
      todaySessions: 2,
      weeklyGoal: 5,
      weeklyCompleted: 3
    };

    setStudentData(mockStudentData);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleEmergencyHelp = () => {
    // Mock emergency help action
    console.log('Emergency help requested');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleBasedHeader />
      
      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        userRole="student"
      />

      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {getGreeting()}, {studentData.name}! 👋
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    Ready to continue your learning journey? You have {studentData.todaySessions} sessions today.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="Trophy" size={16} color="var(--color-primary)" />
                      <span className="text-sm font-medium text-foreground">Level {studentData.currentLevel}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Flame" size={16} color="var(--color-accent)" />
                      <span className="text-sm font-medium text-foreground">{studentData.learningStreak} day streak</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={16} color="var(--color-success)" />
                      <span className="text-sm font-medium text-foreground">{studentData.weeklyCompleted}/{studentData.weeklyGoal} weekly goal</span>
                    </div>
                  </div>
                </div>
                
                {/* Emergency Help Button */}
                <div className="hidden lg:block">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                    onClick={handleEmergencyHelp}
                  >
                    Need Help?
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Upcoming Sessions */}
              <UpcomingSessionsCard />
              
              {/* Quick Access Tiles */}
              <QuickAccessTiles />
              
              {/* Recent Feedback */}
              <RecentFeedbackCard />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Booking Status */}
              <BookingStatusIndicator userRole="student" />
              
              {/* Progress Tracking */}
              <ProgressTrackingSection />
              
              {/* Schedule Widget */}
              <ScheduleWidget />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Booking Status */}
            <BookingStatusIndicator userRole="student" />
            
            {/* Upcoming Sessions */}
            <UpcomingSessionsCard />
            
            {/* Quick Access Tiles */}
            <QuickAccessTiles />
            
            {/* Gamification Elements */}
            <GamificationElements />
            
            {/* Schedule Widget */}
            <ScheduleWidget />
            
            {/* Recent Feedback */}
            <RecentFeedbackCard />
            
            {/* Progress Tracking */}
            <ProgressTrackingSection />
          </div>

          {/* Floating Action Button (Mobile) */}
          <div className="fixed bottom-24 right-4 lg:hidden z-50">
            <Button
              variant="default"
              size="icon"
              iconName="Plus"
              iconSize={24}
              onClick={() => navigate('/booking-system')}
              className="w-14 h-14 rounded-full shadow-modal"
            >
            </Button>
          </div>

          {/* Emergency Help (Mobile) */}
          <div className="fixed bottom-24 left-4 lg:hidden z-50">
            <Button
              variant="outline"
              size="icon"
              iconName="HelpCircle"
              iconSize={20}
              onClick={handleEmergencyHelp}
              className="w-12 h-12 rounded-full shadow-modal bg-card"
            >
            </Button>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavigation />
    </div>
  );
};

export default StudentDashboard;