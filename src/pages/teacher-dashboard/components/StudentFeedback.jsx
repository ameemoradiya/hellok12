import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentFeedback = ({ feedbacks, onViewAllFeedback }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Feedback' },
    { value: 'recent', label: 'Recent' },
    { value: 'high-rated', label: '5 Stars' },
    { value: 'needs-attention', label: 'Needs Attention' }
  ];

  const filteredFeedbacks = feedbacks.filter(feedback => {
    switch (selectedFilter) {
      case 'recent':
        return new Date(feedback.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      case 'high-rated':
        return feedback.rating === 5;
      case 'needs-attention':
        return feedback.rating <= 3;
      default:
        return true;
    }
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        color={i < rating ? "var(--color-warning)" : "var(--color-muted)"}
      />
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Student Feedback</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={16}
          onClick={onViewAllFeedback}
        >
          View All
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 p-1 bg-muted rounded-lg">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedFilter(option.value)}
            className={`px-3 py-1 text-xs font-medium rounded transition-micro ${
              selectedFilter === option.value
                ? 'bg-card text-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {filteredFeedbacks.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={48} color="var(--color-muted-foreground)" />
          <p className="text-muted-foreground mt-2">No feedback available</p>
          <p className="text-sm text-muted-foreground">
            {selectedFilter === 'all' ? 'Complete more sessions to receive feedback' : 'Try adjusting your filter'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFeedbacks.slice(0, 5).map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-micro"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Image
                    src={feedback.student.avatar}
                    alt={feedback.student.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{feedback.student.name}</h4>
                    <p className="text-xs text-muted-foreground">{feedback.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {renderStars(feedback.rating)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(feedback.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <p className="text-sm text-foreground mb-2 line-clamp-2">
                {feedback.comment}
              </p>

              {feedback.tags && feedback.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {feedback.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Session:</span>
                  <span className="text-foreground">{feedback.sessionDate}</span>
                </div>
                {feedback.parentFeedback && (
                  <div className="flex items-center space-x-1 text-primary">
                    <Icon name="Users" size={12} />
                    <span>Parent feedback included</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredFeedbacks.length > 5 && (
            <div className="text-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewAllFeedback}
              >
                View {filteredFeedbacks.length - 5} more feedback
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-success">
              {(feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length || 0).toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">Avg. Rating</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">
              {feedbacks.filter(f => f.rating === 5).length}
            </div>
            <div className="text-xs text-muted-foreground">5-Star Reviews</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">
              {Math.round((feedbacks.filter(f => f.rating >= 4).length / feedbacks.length) * 100 || 0)}%
            </div>
            <div className="text-xs text-muted-foreground">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;