import React, { useState, useEffect } from 'react';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import NotificationCenter from '../../components/ui/NotificationCenter';
import BookingStatusIndicator from '../../components/ui/BookingStatusIndicator';
import RoleContextSwitcher from '../../components/ui/RoleContextSwitcher';
import MetricsOverview from './components/MetricsOverview';
import TeacherManagement from './components/TeacherManagement';
import StudentOverview from './components/StudentOverview';
import RevenueAnalytics from './components/RevenueAnalytics';
import CurriculumManager from './components/CurriculumManager';
import SchoolBranding from './components/SchoolBranding';
import QuickActions from './components/QuickActions';
import SystemAlerts from './components/SystemAlerts';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SchoolAdminDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [currentSchool, setCurrentSchool] = useState(null);

  useEffect(() => {
    // Set page title
    document.title = 'School Admin Dashboard - HelloK12';
  }, []);

  const handleContextChange = (newContext) => {
    setCurrentSchool(newContext);
    console.log('School context changed:', newContext);
  };

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'teachers', label: 'Teachers', icon: 'Users' },
    { id: 'students', label: 'Students', icon: 'GraduationCap' },
    { id: 'curriculum', label: 'Curriculum', icon: 'BookOpen' },
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { id: 'branding', label: 'Branding', icon: 'Palette' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <MetricsOverview />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <SystemAlerts />
              </div>
              <div>
                <BookingStatusIndicator userRole="admin" />
              </div>
            </div>
            <QuickActions />
          </div>
        );
      case 'teachers':
        return <TeacherManagement />;
      case 'students':
        return <StudentOverview />;
      case 'curriculum':
        return <CurriculumManager />;
      case 'revenue':
        return <RevenueAnalytics />;
      case 'branding':
        return <SchoolBranding />;
      case 'settings':
        return (
          <div className="bg-card rounded-lg border border-border p-8 text-center">
            <Icon name="Settings" size={48} color="var(--color-muted-foreground)" />
            <h3 className="font-medium text-foreground mt-4 mb-2">Settings Panel</h3>
            <p className="text-muted-foreground mb-4">
              Configure school preferences, user permissions, and system settings
            </p>
            <Button variant="default" iconName="Settings" iconPosition="left" iconSize={16}>
              Open Settings
            </Button>
          </div>
        );
      default:
        return <MetricsOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">School Administration</h1>
                <p className="text-muted-foreground">
                  Manage your school's teachers, students, curriculum, and operations
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <RoleContextSwitcher 
                  userRole="admin" 
                  onContextChange={handleContextChange}
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
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    3
                  </span>
                  
                  <NotificationCenter
                    isOpen={showNotifications}
                    onClose={() => setShowNotifications(false)}
                    userRole="admin"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-border">
              <div className="flex space-x-1 overflow-x-auto pb-2">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-micro whitespace-nowrap ${
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={section.icon} size={16} />
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;