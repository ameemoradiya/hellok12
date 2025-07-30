import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange, className = '' }) => {
  const roles = [
    {
      value: 'student',
      label: 'Student',
      description: 'Join classes, track progress, and learn with games',
      icon: 'GraduationCap',
      color: 'text-primary'
    },
    {
      value: 'parent',
      label: 'Parent',
      description: 'Book sessions, manage payments, and track child progress',
      icon: 'Users',
      color: 'text-secondary'
    },
    {
      value: 'teacher',
      label: 'Teacher',
      description: 'Teach students, manage schedule, and earn income',
      icon: 'BookOpen',
      color: 'text-accent'
    },
    {
      value: 'school-admin',
      label: 'School Admin',
      description: 'Manage school operations, teachers, and students',
      icon: 'Building',
      color: 'text-warning'
    }
  ];

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Choose Your Role</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => onRoleChange(role.value)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedRole === role.value
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedRole === role.value ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={role.icon} 
                  size={20} 
                  color={selectedRole === role.value ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                />
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${
                  selectedRole === role.value ? 'text-primary' : 'text-foreground'
                }`}>
                  {role.label}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {role.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;