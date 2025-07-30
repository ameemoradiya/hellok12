import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Teacher Application Pending',
      message: '3 teacher applications require review and approval',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      priority: 'high',
      actionRequired: true,
      dismissed: false
    },
    {
      id: 2,
      type: 'info',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance on February 15, 2024 from 2:00 AM - 4:00 AM EST',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      priority: 'medium',
      actionRequired: false,
      dismissed: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Payment Processing Updated',
      message: 'Stripe integration has been successfully updated with enhanced security features',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      priority: 'low',
      actionRequired: false,
      dismissed: false
    },
    {
      id: 4,
      type: 'error',
      title: 'Storage Limit Warning',
      message: 'School storage is at 85% capacity. Consider upgrading your plan or removing old files',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      priority: 'high',
      actionRequired: true,
      dismissed: false
    }
  ]);

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const handleAction = (alertId, alertType) => {
    console.log(`Handling action for alert ${alertId} of type ${alertType}`);
    // Handle specific actions based on alert type
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'error': return 'bg-destructive/10';
      case 'warning': return 'bg-warning/10';
      case 'success': return 'bg-success/10';
      case 'info': return 'bg-primary/10';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const highPriorityAlerts = activeAlerts.filter(alert => alert.priority === 'high');

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-foreground">System Alerts</h2>
            {highPriorityAlerts.length > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">
                {highPriorityAlerts.length} urgent
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Settings" iconSize={14}>
              Settings
            </Button>
            <Button variant="ghost" size="sm" iconName="X" iconSize={14}>
              Dismiss All
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" />
            <h3 className="font-medium text-foreground mt-4 mb-2">All Clear!</h3>
            <p className="text-muted-foreground">No system alerts at this time</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-micro ${
                  alert.priority === 'high' ?'border-destructive/20 bg-destructive/5' :'border-border bg-muted/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-8 h-8 rounded-full ${getAlertBgColor(alert.type)} flex items-center justify-center flex-shrink-0`}>
                      <Icon 
                        name={getAlertIcon(alert.type)} 
                        size={16} 
                        color={`var(--color-${getAlertColor(alert.type).replace('text-', '')})`} 
                      />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-foreground">{alert.title}</h3>
                        <span className={`text-xs font-medium uppercase tracking-wide ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {alert.actionRequired && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleAction(alert.id, alert.type)}
                            >
                              Take Action
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="X"
                            iconSize={14}
                            onClick={() => dismissAlert(alert.id)}
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {activeAlerts.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">
                {activeAlerts.length} active alert{activeAlerts.length > 1 ? 's' : ''}
              </span>
              {highPriorityAlerts.length > 0 && (
                <span className="text-destructive font-medium">
                  {highPriorityAlerts.length} require immediate attention
                </span>
              )}
            </div>
            
            <Button variant="ghost" size="sm" iconName="Bell" iconSize={14}>
              Notification Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemAlerts;