import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeacherManagement = () => {
  const [activeTab, setActiveTab] = useState('active');

  const teachers = {
    active: [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        subjects: ["Mathematics", "Physics"],
        students: 45,
        rating: 4.8,
        status: "active",
        joinDate: "2023-09-15",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@email.com",
        subjects: ["English", "Literature"],
        students: 38,
        rating: 4.9,
        status: "active",
        joinDate: "2023-08-22",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        subjects: ["Spanish", "History"],
        students: 52,
        rating: 4.7,
        status: "active",
        joinDate: "2023-10-03",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      }
    ],
    pending: [
      {
        id: 4,
        name: "David Wilson",
        email: "david.wilson@email.com",
        subjects: ["Science", "Chemistry"],
        experience: "5 years",
        status: "pending",
        appliedDate: "2024-01-25",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      {
        id: 5,
        name: "Lisa Thompson",
        email: "lisa.thompson@email.com",
        subjects: ["Art", "Music"],
        experience: "8 years",
        status: "pending",
        appliedDate: "2024-01-28",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
      }
    ]
  };

  const handleApprove = (teacherId) => {
    console.log('Approving teacher:', teacherId);
  };

  const handleReject = (teacherId) => {
    console.log('Rejecting teacher:', teacherId);
  };

  const tabs = [
    { id: 'active', label: 'Active Teachers', count: teachers.active.length },
    { id: 'pending', label: 'Pending Approval', count: teachers.pending.length }
  ];

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Teacher Management</h2>
          <Button variant="default" iconName="UserPlus" iconPosition="left" iconSize={16}>
            Invite Teacher
          </Button>
        </div>
        
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-micro ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'active' && (
          <div className="space-y-4">
            {teachers.active.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={teacher.avatar} 
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{teacher.email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {teacher.subjects.join(', ')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {teacher.students} students
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} color="var(--color-accent)" />
                    <span className="text-sm font-medium text-foreground">{teacher.rating}</span>
                  </div>
                  <Button variant="outline" size="sm" iconName="Settings" iconSize={14}>
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="space-y-4">
            {teachers.pending.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={teacher.avatar} 
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{teacher.email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {teacher.subjects.join(', ')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {teacher.experience} experience
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="Eye" 
                    iconSize={14}
                  >
                    Review
                  </Button>
                  <Button 
                    variant="success" 
                    size="sm" 
                    iconName="Check" 
                    iconSize={14}
                    onClick={() => handleApprove(teacher.id)}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    iconName="X" 
                    iconSize={14}
                    onClick={() => handleReject(teacher.id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherManagement;