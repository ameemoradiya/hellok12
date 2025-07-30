import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTrackingCard = ({ selectedChild, progressData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const timeframes = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-error';
      case 'intermediate': return 'text-warning';
      case 'advanced': return 'text-success';
      case 'expert': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getSkillLevelBg = (level) => {
    switch (level) {
      case 'beginner': return 'bg-error';
      case 'intermediate': return 'bg-warning';
      case 'advanced': return 'bg-success';
      case 'expert': return 'bg-primary';
      default: return 'bg-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (!selectedChild || !progressData) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Progress Tracking</h3>
        <div className="text-center py-8">
          <Icon name="TrendingUp" size={48} color="var(--color-muted-foreground)" />
          <p className="text-muted-foreground mt-2">Select a child to view progress</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Progress Tracking</h3>
        <div className="flex items-center space-x-2">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe.value}
              variant={selectedTimeframe === timeframe.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe.value)}
              className="text-xs"
            >
              {timeframe.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">Overall Progress</h4>
          <span className="text-2xl font-bold text-primary">{progressData.overall.percentage}%</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progressData.overall.percentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{progressData.overall.completedSessions} sessions completed</span>
          <span>{progressData.overall.totalHours} hours learned</span>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-4">Subject Progress</h4>
        <div className="space-y-4">
          {progressData.subjects.map((subject, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h5 className="font-medium text-foreground">{subject.name}</h5>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSkillLevelColor(subject.level)} bg-opacity-10`}>
                    {subject.level}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">{subject.progress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full transition-all duration-300 ${getSkillLevelBg(subject.level)}`}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{subject.completedLessons}/{subject.totalLessons} lessons</span>
                <span>Last session: {formatDate(subject.lastSession)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-4">Recent Achievements</h4>
        <div className="space-y-3">
          {progressData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="Award" size={20} color="var(--color-success)" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(achievement.date)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Streak */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-success/10 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="Flame" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{progressData.streak.current} Day Streak!</p>
              <p className="text-sm text-muted-foreground">Keep up the great work</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Best: {progressData.streak.best} days</p>
          </div>
        </div>
      </div>

      {/* Teacher Feedback */}
      {progressData.recentFeedback && (
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-3">Latest Teacher Feedback</h4>
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-muted-foreground)" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-foreground">{progressData.recentFeedback.teacher}</p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        color={i < progressData.recentFeedback.rating ? "var(--color-warning)" : "var(--color-muted)"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{progressData.recentFeedback.subject}</p>
                <p className="text-sm text-foreground">{progressData.recentFeedback.comment}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDate(progressData.recentFeedback.date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          iconName="FileText"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Detailed Report
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Share"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Share Progress
        </Button>
      </div>
    </div>
  );
};

export default ProgressTrackingCard;