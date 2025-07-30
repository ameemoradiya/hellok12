import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('student');
  const [notifications, setNotifications] = useState(3);
  const [currentUser, setCurrentUser] = useState({
    name: 'Alex Johnson',
    avatar: '/assets/images/avatar.jpg',
    school: 'Riverside Elementary'
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Determine user role based on current route
    const path = location.pathname;
    if (path.includes('student-dashboard')) setUserRole('student');
    else if (path.includes('parent-dashboard')) setUserRole('parent');
    else if (path.includes('teacher-dashboard')) setUserRole('teacher');
    else if (path.includes('school-admin-dashboard')) setUserRole('admin');
    else setUserRole('guest');
  }, [location.pathname]);

  const getNavigationItems = () => {
    const baseItems = {
      student: [
        { label: 'My Classes', path: '/student-dashboard', icon: 'BookOpen' },
        { label: 'Schedule', path: '/booking-system', icon: 'Calendar' },
        { label: 'Progress', path: '/student-dashboard/progress', icon: 'TrendingUp' },
        { label: 'Games', path: '/student-dashboard/games', icon: 'Gamepad2' }
      ],
      parent: [
        { label: 'Dashboard', path: '/parent-dashboard', icon: 'Home' },
        { label: 'Book Sessions', path: '/booking-system', icon: 'Calendar' },
        { label: 'Children', path: '/parent-dashboard/children', icon: 'Users' },
        { label: 'Payments', path: '/parent-dashboard/payments', icon: 'CreditCard' }
      ],
      teacher: [
        { label: 'Dashboard', path: '/teacher-dashboard', icon: 'Home' },
        { label: 'My Students', path: '/teacher-dashboard/students', icon: 'Users' },
        { label: 'Schedule', path: '/booking-system', icon: 'Calendar' },
        { label: 'Earnings', path: '/teacher-dashboard/earnings', icon: 'DollarSign' }
      ],
      admin: [
        { label: 'Overview', path: '/school-admin-dashboard', icon: 'BarChart3' },
        { label: 'Teachers', path: '/school-admin-dashboard/teachers', icon: 'Users' },
        { label: 'Students', path: '/school-admin-dashboard/students', icon: 'GraduationCap' },
        { label: 'Reports', path: '/school-admin-dashboard/reports', icon: 'FileText' }
      ],
      guest: [
        { label: 'Login', path: '/login-register', icon: 'LogIn' }
      ]
    };

    return baseItems[userRole] || baseItems.guest;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login-register');
    setIsMenuOpen(false);
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">HelloK12</span>
              {userRole !== 'guest' && (
                <span className="text-xs text-muted-foreground">{currentUser.school}</span>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              size="sm"
              iconName={item.icon}
              iconPosition="left"
              iconSize={16}
              onClick={() => handleNavigation(item.path)}
              className="transition-micro"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {userRole !== 'guest' && (
            <>
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Bell"
                  iconSize={20}
                  className="relative"
                />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {notifications}
                  </span>
                )}
              </div>

              {/* User Menu */}
              <div className="hidden lg:flex items-center space-x-2 pl-3 border-l border-border">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-muted-foreground)" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{currentUser.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="LogOut"
                  iconSize={16}
                  onClick={handleLogout}
                  className="ml-2"
                />
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            iconName={isMenuOpen ? "X" : "Menu"}
            iconSize={20}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-modal">
          <div className="px-4 py-3 space-y-1">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                size="sm"
                iconName={item.icon}
                iconPosition="left"
                iconSize={16}
                onClick={() => handleNavigation(item.path)}
                className="w-full justify-start"
              >
                {item.label}
              </Button>
            ))}
            
            {userRole !== 'guest' && (
              <>
                <div className="border-t border-border my-2"></div>
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="var(--color-muted-foreground)" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{currentUser.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleLogout}
                  className="w-full justify-start text-destructive hover:text-destructive"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default RoleBasedHeader;