import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = () => {
  const metrics = [
    {
      id: 1,
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      changeType: "increase",
      icon: "Users",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Active Teachers",
      value: "89",
      change: "+5%",
      changeType: "increase",
      icon: "GraduationCap",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 3,
      title: "Monthly Revenue",
      value: "$24,580",
      change: "+18%",
      changeType: "increase",
      icon: "DollarSign",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 4,
      title: "Active Sessions",
      value: "156",
      change: "-3%",
      changeType: "decrease",
      icon: "Video",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-soft transition-micro">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
              <Icon name={metric.icon} size={24} color={`var(--color-${metric.color.replace('text-', '')})`} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              metric.changeType === 'increase' ? 'text-success' : 'text-destructive'
            }`}>
              <Icon 
                name={metric.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span className="font-medium">{metric.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{metric.value}</h3>
            <p className="text-sm text-muted-foreground">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;