import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeacherProfileCard = ({ teacher, onEditProfile }) => {
  const [isOnline, setIsOnline] = useState(true);

  const handleStatusToggle = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={teacher.avatar}
              alt={teacher.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${
              isOnline ? 'bg-success' : 'bg-muted-foreground'
            }`} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{teacher.name}</h2>
            <p className="text-muted-foreground">{teacher.subjects.join(', ')}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="Star" size={16} color="var(--color-warning)" />
              <span className="text-sm font-medium text-foreground">{teacher.rating}</span>
              <span className="text-sm text-muted-foreground">({teacher.totalReviews} reviews)</span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          iconSize={16}
          onClick={onEditProfile}
        >
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{teacher.totalStudents}</div>
          <div className="text-sm text-muted-foreground">Students</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{teacher.completedSessions}</div>
          <div className="text-sm text-muted-foreground">Sessions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{teacher.experience}</div>
          <div className="text-sm text-muted-foreground">Years Exp.</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">{teacher.languages}</div>
          <div className="text-sm text-muted-foreground">Languages</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-muted-foreground'}`} />
          <span className="text-sm text-foreground">
            {isOnline ? 'Available for bookings' : 'Unavailable'}
          </span>
        </div>
        <Button
          variant={isOnline ? "outline" : "default"}
          size="sm"
          onClick={handleStatusToggle}
        >
          {isOnline ? 'Go Offline' : 'Go Online'}
        </Button>
      </div>
    </div>
  );
};

export default TeacherProfileCard;