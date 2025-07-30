import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTrackingSection = () => {
  const [progressData, setProgressData] = useState({});
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Mock progress data
    const mockProgress = {
      currentLevel: 12,
      xpPoints: 2450,
      xpToNextLevel: 550,
      learningStreak: 7,
      completedLessons: 45,
      totalLessons: 60,
      weeklyGoal: 5,
      weeklyCompleted: 3,
      subjects: [
        {
          name: "English",
          progress: 85,
          color: "bg-blue-500",
          lessons: 18,
          totalLessons: 20
        },
        {
          name: "Spanish",
          progress: 72,
          color: "bg-green-500",
          lessons: 15,
          totalLessons: 20
        },
        {
          name: "Japanese",
          progress: 60,
          color: "bg-purple-500",
          lessons: 12,
          totalLessons: 20
        }
      ]
    };

    const mockAchievements = [
      {
        id: 1,
        title: "Reading Champion",
        description: "Complete 10 reading exercises",
        icon: "BookOpen",
        color: "text-blue-500",
        bgColor: "bg-blue-100",
        earned: true,
        earnedDate: "2025-07-28"
      },
      {
        id: 2,
        title: "Streak Master",
        description: "7-day learning streak",
        icon: "Flame",
        color: "text-orange-500",
        bgColor: "bg-orange-100",
        earned: true,
        earnedDate: "2025-07-30"
      },
      {
        id: 3,
        title: "Grammar Guru",
        description: "Perfect score on 5 grammar tests",
        icon: "Award",
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
        earned: true,
        earnedDate: "2025-07-25"
      },
      {
        id: 4,
        title: "Conversation King",
        description: "Complete 20 speaking sessions",
        icon: "MessageCircle",
        color: "text-green-500",
        bgColor: "bg-green-100",
        earned: false,
        progress: 15,
        total: 20
      },
      {
        id: 5,
        title: "Quiz Master",
        description: "Score 90%+ on 10 quizzes",
        icon: "Brain",
        color: "text-purple-500",
        bgColor: "bg-purple-100",
        earned: false,
        progress: 7,
        total: 10
      }
    ];

    setProgressData(mockProgress);
    setAchievements(mockAchievements);
  }, []);

  const getProgressPercentage = () => {
    const totalXP = progressData.xpPoints + progressData.xpToNextLevel;
    return (progressData.xpPoints / totalXP) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Level and XP Progress */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Trophy" size={24} color="var(--color-primary)" />
            <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">Level {progressData.currentLevel}</div>
            <div className="text-sm text-muted-foreground">{progressData.xpPoints} XP</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress to Level {progressData.currentLevel + 1}</span>
            <span className="text-foreground">{progressData.xpToNextLevel} XP to go</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Flame" size={20} color="var(--color-accent)" />
            </div>
            <div className="text-lg font-semibold text-foreground">{progressData.learningStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name="BookOpen" size={20} color="var(--color-success)" />
            </div>
            <div className="text-lg font-semibold text-foreground">{progressData.completedLessons}</div>
            <div className="text-xs text-muted-foreground">Lessons Done</div>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Target" size={20} color="var(--color-primary)" />
            </div>
            <div className="text-lg font-semibold text-foreground">{progressData.weeklyCompleted}/{progressData.weeklyGoal}</div>
            <div className="text-xs text-muted-foreground">Weekly Goal</div>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Award" size={20} color="var(--color-accent)" />
            </div>
            <div className="text-lg font-semibold text-foreground">{achievements.filter(a => a.earned).length}</div>
            <div className="text-xs text-muted-foreground">Badges Earned</div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Subject Progress</h3>
          <Button variant="ghost" size="sm" iconName="BarChart3" iconPosition="left" iconSize={16}>
            View Details
          </Button>
        </div>
        
        <div className="space-y-4">
          {progressData.subjects?.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">{subject.name}</span>
                <span className="text-sm text-muted-foreground">
                  {subject.lessons}/{subject.totalLessons} lessons
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${subject.color} transition-all duration-500`}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-foreground">{subject.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Achievement Badges</h3>
          <Button variant="ghost" size="sm" iconName="Award" iconPosition="left" iconSize={16}>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.slice(0, 6).map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-micro ${
                achievement.earned 
                  ? 'border-success bg-success/5' :'border-border bg-muted/30'
              }`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full ${achievement.bgColor} flex items-center justify-center mx-auto mb-3 ${
                  !achievement.earned ? 'opacity-50' : ''
                }`}>
                  <Icon name={achievement.icon} size={24} color={achievement.earned ? achievement.color.replace('text-', 'var(--color-') + ')' : 'var(--color-muted-foreground)'} />
                </div>
                
                <h4 className={`font-medium mb-1 ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {achievement.title}
                </h4>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                
                {achievement.earned ? (
                  <div className="text-xs text-success font-medium">
                    Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      {achievement.progress}/{achievement.total}
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackingSection;