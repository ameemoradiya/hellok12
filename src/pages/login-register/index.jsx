import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';


import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated && userRole) {
      const dashboardRoutes = {
        'student': '/student-dashboard',
        'parent': '/parent-dashboard',
        'teacher': '/teacher-dashboard',
        'admin': '/school-admin-dashboard'
      };
      navigate(dashboardRoutes[userRole] || '/student-dashboard');
    }

    // Update current time
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-foreground">HelloK12</h1>
              <p className="text-sm text-muted-foreground">Language Learning Platform</p>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {activeTab === 'login' ? 'Welcome Back!' : 'Join HelloK12'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'login' ? 'Sign in to continue your learning journey' : 'Create your account to get started'}
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-xl border border-border shadow-modal overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            <button
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                activeTab === 'login' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="LogIn" size={16} />
                <span>Sign In</span>
              </div>
            </button>
            
            <button
              onClick={() => handleTabChange('register')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                activeTab === 'register' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="UserPlus" size={16} />
                <span>Sign Up</span>
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Forms */}
            {activeTab === 'login' ? (
              <LoginForm
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            ) : (
              <RegisterForm />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mb-4">
            <button className="hover:text-foreground transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">
              Terms of Service
            </button>
            <span>•</span>
            <button className="hover:text-foreground transition-colors">
              Support
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} />
            <span>Secure & Encrypted</span>
            <span>•</span>
            <span>© {currentTime.getFullYear()} HelloK12</span>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-2 mb-2">
            <Icon name="Info" size={16} color="var(--color-primary)" />
            <h3 className="text-sm font-medium text-foreground">Demo Credentials</h3>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Student: student@example.com / student123</div>
            <div>Parent: parent@example.com / parent123</div>
            <div>Teacher: teacher@example.com / teacher123</div>
            <div>Admin: admin@example.com / admin123</div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default LoginRegister;