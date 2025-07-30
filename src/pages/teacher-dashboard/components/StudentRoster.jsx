import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StudentRoster = ({ students, onViewStudentProfile, onMessageStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'progress':
          return b.progress - a.progress;
        case 'sessions':
          return b.totalSessions - a.totalSessions;
        case 'recent':
          return new Date(b.lastSession) - new Date(a.lastSession);
        default:
          return 0;
      }
    });

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-success';
    if (progress >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressBg = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">My Students</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">{students.length} students</span>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search students or subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground"
          >
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="sessions">Sort by Sessions</option>
            <option value="recent">Sort by Recent</option>
          </select>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Users" size={48} color="var(--color-muted-foreground)" />
          <p className="text-muted-foreground mt-2">
            {searchTerm ? 'No students found' : 'No students yet'}
          </p>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms' : 'Students will appear here once they book sessions'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-micro"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {student.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Grade {student.grade} • {student.subjects.join(', ')}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Last session: {student.lastSession}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getProgressColor(student.progress)}`}>
                    {student.progress}% Progress
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {student.totalSessions} sessions
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getProgressBg(student.progress)}`}
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-3 text-center">
                <div>
                  <div className="text-sm font-medium text-foreground">{student.completedHomework}</div>
                  <div className="text-xs text-muted-foreground">Homework</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{student.averageRating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{student.attendanceRate}%</div>
                  <div className="text-xs text-muted-foreground">Attendance</div>
                </div>
              </div>

              {/* Recent Activity */}
              {student.recentActivity && (
                <div className="mb-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                  <Icon name="Activity" size={12} className="inline mr-1" />
                  {student.recentActivity}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="User"
                  iconPosition="left"
                  iconSize={14}
                  onClick={() => onViewStudentProfile(student)}
                  className="flex-1"
                >
                  View Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  iconSize={14}
                  onClick={() => onMessageStudent(student)}
                  className="flex-1"
                >
                  Message
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Calendar"
                  iconSize={14}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentRoster;