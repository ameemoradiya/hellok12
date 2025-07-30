import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeacherCard = ({ teacher, onSelect, isSelected }) => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'busy': return 'text-warning';
      case 'offline': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available': return 'Available now';
      case 'busy': return 'Busy until 3:00 PM';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`bg-card rounded-lg border transition-micro hover:shadow-modal cursor-pointer ${
      isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
    }`} onClick={() => onSelect(teacher)}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="relative">
            <Image
              src={teacher.avatar}
              alt={teacher.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              teacher.availability === 'available' ? 'bg-success' : 
              teacher.availability === 'busy' ? 'bg-warning' : 'bg-error'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground truncate">{teacher.name}</h3>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} color="var(--color-warning)" />
                <span className="text-sm font-medium text-foreground">{teacher.rating}</span>
                <span className="text-xs text-muted-foreground">({teacher.reviewCount})</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{teacher.title}</p>
            <div className={`text-xs ${getAvailabilityColor(teacher.availability)} mt-1`}>
              {getAvailabilityText(teacher.availability)}
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {teacher.specializations.slice(0, 3).map((spec, index) => (
              <span key={index} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md">
                {spec}
              </span>
            ))}
            {teacher.specializations.length > 3 && (
              <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md">
                +{teacher.specializations.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-3 text-center">
          <div>
            <div className="text-sm font-medium text-foreground">{teacher.experience}</div>
            <div className="text-xs text-muted-foreground">Years Exp.</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">{teacher.completedSessions}</div>
            <div className="text-xs text-muted-foreground">Sessions</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">{teacher.responseTime}</div>
            <div className="text-xs text-muted-foreground">Response</div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-semibold text-foreground">${teacher.hourlyRate}</span>
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
          {teacher.packageDiscount && (
            <div className="text-xs text-success">
              {teacher.packageDiscount}% off packages
            </div>
          )}
        </div>

        {/* Languages */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Globe" size={14} />
            <span>{teacher.languages.join(', ')}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="w-full"
          iconName={isSelected ? "Check" : "Calendar"}
          iconPosition="left"
          iconSize={16}
        >
          {isSelected ? 'Selected' : 'Select Teacher'}
        </Button>
      </div>
    </div>
  );
};

export default TeacherCard;