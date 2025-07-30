import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChildProfileCard = ({ child, isActive, onSelect, onBookSession }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-success';
    if (progress >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressBgColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div 
      className={`bg-card rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-modal ${
        isActive ? 'border-primary shadow-modal' : 'border-border'
      }`}
      onClick={onSelect}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={child.avatar}
                alt={child.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {child.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{child.name}</h3>
              <p className="text-sm text-muted-foreground">{child.grade} • {child.age} years old</p>
            </div>
          </div>
          {isActive && (
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
          )}
        </div>

        {/* Progress Overview */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className={`text-sm font-semibold ${getProgressColor(child.overallProgress)}`}>
              {child.overallProgress}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${getProgressBgColor(child.overallProgress)}`}
              style={{ width: `${child.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Current Subjects</h4>
          <div className="flex flex-wrap gap-2">
            {child.subjects.map((subject, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Next Session */}
        {child.nextSession && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Next Session</p>
                <p className="text-xs text-muted-foreground">{child.nextSession.subject}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary">{child.nextSession.time}</p>
                <p className="text-xs text-muted-foreground">{child.nextSession.teacher}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{child.stats.completedSessions}</p>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{child.stats.hoursLearned}</p>
            <p className="text-xs text-muted-foreground">Hours</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{child.stats.achievements}</p>
            <p className="text-xs text-muted-foreground">Badges</p>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          iconSize={16}
          onClick={(e) => {
            e.stopPropagation();
            onBookSession(child);
          }}
          className="w-full"
        >
          Book Session
        </Button>
      </div>
    </div>
  );
};

export default ChildProfileCard;