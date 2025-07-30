import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'create-lesson',
      title: 'Create Lesson Plan',
      description: 'Design new curriculum content',
      icon: 'BookOpen',
      color: 'bg-primary/10 text-primary',
      action: () => onAction('create-lesson')
    },
    {
      id: 'schedule-session',
      title: 'Schedule Session',
      description: 'Set up a new teaching session',
      icon: 'Calendar',
      color: 'bg-success/10 text-success',
      action: () => onAction('schedule-session')
    },
    {
      id: 'upload-material',
      title: 'Upload Materials',
      description: 'Add teaching resources',
      icon: 'Upload',
      color: 'bg-accent/10 text-accent',
      action: () => onAction('upload-material')
    },
    {
      id: 'view-analytics',
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: 'BarChart3',
      color: 'bg-secondary/10 text-secondary',
      action: () => onAction('view-analytics')
    },
    {
      id: 'message-parents',
      title: 'Message Parents',
      description: 'Send updates to families',
      icon: 'MessageCircle',
      color: 'bg-warning/10 text-warning',
      action: () => onAction('message-parents')
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create progress reports',
      icon: 'FileText',
      color: 'bg-error/10 text-error',
      action: () => onAction('generate-report')
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-micro text-left group"
          >
            <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
              <Icon name={action.icon} size={20} />
            </div>
            <h4 className="font-medium text-foreground mb-1">{action.title}</h4>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;