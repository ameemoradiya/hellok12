import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Invite Teacher",
      description: "Send invitation to new teachers",
      icon: "UserPlus",
      color: "text-primary",
      bgColor: "bg-primary/10",
      action: () => console.log('Invite teacher')
    },
    {
      id: 2,
      title: "Add Student",
      description: "Register new student account",
      icon: "Users",
      color: "text-success",
      bgColor: "bg-success/10",
      action: () => console.log('Add student')
    },
    {
      id: 3,
      title: "Create Class",
      description: "Set up new class schedule",
      icon: "Calendar",
      color: "text-accent",
      bgColor: "bg-accent/10",
      action: () => console.log('Create class')
    },
    {
      id: 4,
      title: "Generate Report",
      description: "Download performance reports",
      icon: "FileText",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      action: () => console.log('Generate report')
    },
    {
      id: 5,
      title: "Manage Payments",
      description: "View billing and transactions",
      icon: "CreditCard",
      color: "text-warning",
      bgColor: "bg-warning/10",
      action: () => console.log('Manage payments')
    },
    {
      id: 6,
      title: "School Settings",
      description: "Configure school preferences",
      icon: "Settings",
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      action: () => console.log('School settings')
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "teacher_approval",
      message: "Sarah Johnson\'s teacher application approved",
      time: "2 hours ago",
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      id: 2,
      type: "student_enrollment",
      message: "3 new students enrolled in Grade 4",
      time: "4 hours ago",
      icon: "UserPlus",
      color: "text-primary"
    },
    {
      id: 3,
      type: "payment_received",
      message: "Monthly subscription payment received",
      time: "6 hours ago",
      icon: "DollarSign",
      color: "text-success"
    },
    {
      id: 4,
      type: "curriculum_update",
      message: "Mathematics curriculum updated",
      time: "1 day ago",
      icon: "BookOpen",
      color: "text-accent"
    },
    {
      id: 5,
      type: "system_alert",
      message: "Scheduled maintenance completed",
      time: "2 days ago",
      icon: "AlertCircle",
      color: "text-warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Common administrative tasks</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-micro text-left"
              >
                <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={action.icon} size={20} color={`var(--color-${action.color.replace('text-', '')})`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Recent Activities</h2>
              <p className="text-sm text-muted-foreground">Latest system events and updates</p>
            </div>
            <Button variant="ghost" size="sm" iconName="ExternalLink" iconSize={14}>
              View All
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                  <Icon name={activity.icon} size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <Button variant="outline" size="sm" fullWidth iconName="Clock" iconPosition="left" iconSize={16}>
              View Activity Log
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;