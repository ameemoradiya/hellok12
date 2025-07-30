import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const RoleContextSwitcher = ({ userRole = 'parent', onContextChange, className = '' }) => {
  const [currentContext, setCurrentContext] = useState(null);
  const [availableContexts, setAvailableContexts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulate available contexts based on user role
    const mockContexts = {
      parent: [
        {
          value: 'emma-johnson',
          label: 'Emma Johnson',
          description: 'Grade 5 • Math & English',
          avatar: '/assets/images/emma.jpg',
          grade: '5th Grade',
          subjects: ['Mathematics', 'English Literature'],
          nextSession: 'Today 3:00 PM',
          progress: 85
        },
        {
          value: 'alex-johnson',
          label: 'Alex Johnson',
          description: 'Grade 3 • Reading & Science',
          avatar: '/assets/images/alex.jpg',
          grade: '3rd Grade',
          subjects: ['Reading', 'Science'],
          nextSession: 'Tomorrow 4:00 PM',
          progress: 92
        },
        {
          value: 'sophia-johnson',
          label: 'Sophia Johnson',
          description: 'Grade 7 • Advanced Math',
          avatar: '/assets/images/sophia.jpg',
          grade: '7th Grade',
          subjects: ['Advanced Mathematics', 'Physics'],
          nextSession: 'Friday 2:00 PM',
          progress: 78
        }
      ],
      admin: [
        {
          value: 'riverside-elementary',
          label: 'Riverside Elementary',
          description: '450 students • 25 teachers',
          icon: 'School',
          studentCount: 450,
          teacherCount: 25,
          activeClasses: 18,
          type: 'elementary'
        },
        {
          value: 'oakwood-middle',
          label: 'Oakwood Middle School',
          description: '680 students • 35 teachers',
          icon: 'GraduationCap',
          studentCount: 680,
          teacherCount: 35,
          activeClasses: 24,
          type: 'middle'
        },
        {
          value: 'district-overview',
          label: 'District Overview',
          description: 'All schools • System-wide view',
          icon: 'Building',
          schoolCount: 8,
          totalStudents: 3200,
          totalTeachers: 180,
          type: 'district'
        }
      ],
      teacher: [
        {
          value: 'grade-5a',
          label: 'Grade 5A - Mathematics',
          description: '24 students • Room 205',
          icon: 'Calculator',
          studentCount: 24,
          room: '205',
          subject: 'Mathematics',
          nextClass: 'Today 10:00 AM'
        },
        {
          value: 'grade-5b',
          label: 'Grade 5B - Mathematics',
          description: '22 students • Room 205',
          icon: 'Calculator',
          studentCount: 22,
          room: '205',
          subject: 'Mathematics',
          nextClass: 'Today 2:00 PM'
        },
        {
          value: 'tutoring-group',
          label: 'After School Tutoring',
          description: '8 students • Various grades',
          icon: 'Users',
          studentCount: 8,
          room: 'Library',
          subject: 'Mixed Subjects',
          nextClass: 'Today 4:00 PM'
        }
      ]
    };

    const contexts = mockContexts[userRole] || [];
    setAvailableContexts(contexts);
    
    if (contexts.length > 0 && !currentContext) {
      setCurrentContext(contexts[0]);
    }
  }, [userRole, currentContext]);

  const handleContextChange = (contextValue) => {
    const newContext = availableContexts.find(ctx => ctx.value === contextValue);
    setCurrentContext(newContext);
    setIsOpen(false);
    
    if (onContextChange) {
      onContextChange(newContext);
    }
  };

  // Don't render if user doesn't have multiple contexts
  if (availableContexts.length <= 1) {
    return null;
  }

  const selectOptions = availableContexts.map(context => ({
    value: context.value,
    label: context.label,
    description: context.description
  }));

  return (
    <div className={`relative ${className}`}>
      {/* Desktop View */}
      <div className="hidden lg:block">
        <Select
          options={selectOptions}
          value={currentContext?.value}
          onChange={handleContextChange}
          placeholder="Select context..."
          className="min-w-64"
        />
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronDown"
          iconPosition="right"
          iconSize={16}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            {userRole === 'parent' && (
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={12} color="var(--color-muted-foreground)" />
              </div>
            )}
            {(userRole === 'admin' || userRole === 'teacher') && (
              <Icon name={currentContext?.icon || 'Building'} size={16} color="var(--color-foreground)" />
            )}
            <span className="truncate">{currentContext?.label}</span>
          </div>
        </Button>

        {/* Mobile Modal */}
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-1100"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-lg border-t border-border z-1200 max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">
                    {userRole === 'parent' && 'Select Child'}
                    {userRole === 'admin' && 'Select School'}
                    {userRole === 'teacher' && 'Select Class'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="X"
                    iconSize={16}
                    onClick={() => setIsOpen(false)}
                  />
                </div>
              </div>
              
              <div className="p-2">
                {availableContexts.map((context) => (
                  <button
                    key={context.value}
                    onClick={() => handleContextChange(context.value)}
                    className={`w-full p-3 rounded-lg text-left hover:bg-muted transition-micro ${
                      currentContext?.value === context.value ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {userRole === 'parent' && (
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Icon name="User" size={16} color="var(--color-muted-foreground)" />
                        </div>
                      )}
                      {(userRole === 'admin' || userRole === 'teacher') && (
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name={context.icon} size={16} color="var(--color-primary)" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground">{context.label}</div>
                        <div className="text-sm text-muted-foreground">{context.description}</div>
                        
                        {userRole === 'parent' && context.nextSession && (
                          <div className="text-xs text-primary mt-1">
                            Next: {context.nextSession}
                          </div>
                        )}
                        
                        {userRole === 'teacher' && context.nextClass && (
                          <div className="text-xs text-primary mt-1">
                            Next: {context.nextClass}
                          </div>
                        )}
                      </div>
                      
                      {currentContext?.value === context.value && (
                        <Icon name="Check" size={16} color="var(--color-success)" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Context Details (Desktop Only) */}
      {currentContext && (
        <div className="hidden lg:block mt-2 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            {userRole === 'parent' && (
              <>
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">Grade:</span>
                  <span className="text-foreground">{currentContext.grade}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Progress:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-success transition-all duration-300"
                        style={{ width: `${currentContext.progress}%` }}
                      />
                    </div>
                    <span className="text-success font-medium">{currentContext.progress}%</span>
                  </div>
                </div>
              </>
            )}
            
            {userRole === 'admin' && (
              <>
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="text-foreground">{currentContext.studentCount || currentContext.totalStudents}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">Teachers:</span>
                  <span className="text-foreground">{currentContext.teacherCount || currentContext.totalTeachers}</span>
                </div>
              </>
            )}
            
            {userRole === 'teacher' && (
              <>
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="text-foreground">{currentContext.studentCount}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">Room:</span>
                  <span className="text-foreground">{currentContext.room}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleContextSwitcher;