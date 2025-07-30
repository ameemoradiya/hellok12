import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const StudentOverview = () => {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const gradeOptions = [
    { value: 'all', label: 'All Grades' },
    { value: 'k', label: 'Kindergarten' },
    { value: '1', label: 'Grade 1' },
    { value: '2', label: 'Grade 2' },
    { value: '3', label: 'Grade 3' },
    { value: '4', label: 'Grade 4' },
    { value: '5', label: 'Grade 5' }
  ];

  const students = [
    {
      id: 1,
      name: "Emma Johnson",
      grade: "5",
      parent: "Michael Johnson",
      sessions: 24,
      progress: 85,
      status: "active",
      lastSession: "2024-01-29",
      avatar: "https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?w=150"
    },
    {
      id: 2,
      name: "Alex Chen",
      grade: "4",
      parent: "Lisa Chen",
      sessions: 18,
      progress: 92,
      status: "active",
      lastSession: "2024-01-28",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      grade: "3",
      parent: "Maria Rodriguez",
      sessions: 31,
      progress: 78,
      status: "active",
      lastSession: "2024-01-30",
      avatar: "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=150"
    },
    {
      id: 4,
      name: "Noah Wilson",
      grade: "5",
      parent: "David Wilson",
      sessions: 12,
      progress: 65,
      status: "inactive",
      lastSession: "2024-01-20",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.parent.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'inactive': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">Student Overview</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                color="var(--color-muted-foreground)"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Search students or parents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-64"
              />
            </div>
            
            <Select
              options={gradeOptions}
              value={selectedGrade}
              onChange={setSelectedGrade}
              className="w-full sm:w-40"
            />
            
            <Button variant="default" iconName="UserPlus" iconPosition="left" iconSize={16}>
              Add Student
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Student</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Grade</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Parent</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sessions</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Progress</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-micro">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <img 
                          src={student.avatar} 
                          alt={student.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last session: {new Date(student.lastSession).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-foreground">Grade {student.grade}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-foreground">{student.parent}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-foreground">{student.sessions}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getProgressColor(student.progress)} transition-all duration-300`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-foreground">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-medium capitalize ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye" iconSize={14}>
                        View
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Settings" iconSize={14}>
                        Manage
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Users" size={48} color="var(--color-muted-foreground)" />
            <p className="text-muted-foreground mt-2">No students found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentOverview;