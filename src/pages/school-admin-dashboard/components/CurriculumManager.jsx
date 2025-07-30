import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CurriculumManager = () => {
  const [activeTab, setActiveTab] = useState('subjects');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english', label: 'English' },
    { value: 'science', label: 'Science' },
    { value: 'spanish', label: 'Spanish' }
  ];

  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      grade: "K-5",
      topics: 24,
      lessons: 156,
      status: "active",
      type: "core",
      lastUpdated: "2024-01-25"
    },
    {
      id: 2,
      name: "English Literature",
      grade: "3-5",
      topics: 18,
      lessons: 98,
      status: "active",
      type: "core",
      lastUpdated: "2024-01-28"
    },
    {
      id: 3,
      name: "Spanish Basics",
      grade: "K-3",
      topics: 12,
      lessons: 72,
      status: "draft",
      type: "language",
      lastUpdated: "2024-01-30"
    }
  ];

  const curriculumMaterials = [
    {
      id: 1,
      title: "HelloK12 Math Fundamentals",
      type: "official",
      subject: "Mathematics",
      grade: "K-2",
      price: "$29.99",
      enrolled: 145,
      rating: 4.8,
      status: "active"
    },
    {
      id: 2,
      title: "Creative Writing Workshop",
      type: "custom",
      subject: "English",
      grade: "3-5",
      price: "Free",
      enrolled: 89,
      rating: 4.6,
      status: "active"
    },
    {
      id: 3,
      title: "Science Experiments Lab",
      type: "official",
      subject: "Science",
      grade: "4-5",
      price: "$19.99",
      enrolled: 67,
      rating: 4.9,
      status: "pending"
    }
  ];

  const tabs = [
    { id: 'subjects', label: 'Subjects & Topics', icon: 'BookOpen' },
    { id: 'materials', label: 'Curriculum Materials', icon: 'Library' },
    { id: 'assignments', label: 'Class Assignments', icon: 'Users' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'draft': return 'text-warning';
      case 'pending': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'official': return 'bg-primary/10 text-primary';
      case 'custom': return 'bg-success/10 text-success';
      case 'core': return 'bg-accent/10 text-accent';
      case 'language': return 'bg-secondary/10 text-secondary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">Curriculum Management</h2>
          
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-micro ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'subjects' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Subject Management</h3>
                <p className="text-sm text-muted-foreground">Organize subjects, topics, and lesson plans</p>
              </div>
              <Button variant="default" iconName="Plus" iconPosition="left" iconSize={16}>
                Add Subject
              </Button>
            </div>

            <div className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="BookOpen" size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-foreground">{subject.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(subject.type)}`}>
                          {subject.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Grade {subject.grade}</span>
                        <span>{subject.topics} topics</span>
                        <span>{subject.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm font-medium capitalize ${getStatusColor(subject.status)}`}>
                      {subject.status}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Edit" iconSize={14}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Settings" iconSize={14}>
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Curriculum Materials</h3>
                <p className="text-sm text-muted-foreground">Manage official and custom learning materials</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Select
                  options={subjectOptions}
                  value={selectedSubject}
                  onChange={setSelectedSubject}
                  className="w-full sm:w-40"
                />
                <Button variant="default" iconName="Plus" iconPosition="left" iconSize={16}>
                  Add Material
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {curriculumMaterials.map((material) => (
                <div key={material.id} className="bg-muted/50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        material.type === 'official' ? 'bg-primary/10' : 'bg-success/10'
                      }`}>
                        <Icon 
                          name={material.type === 'official' ? 'Award' : 'FileText'} 
                          size={20} 
                          color={material.type === 'official' ? 'var(--color-primary)' : 'var(--color-success)'} 
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{material.title}</h3>
                        <p className="text-sm text-muted-foreground">{material.subject} • Grade {material.grade}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                      {material.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-medium text-foreground">{material.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Enrolled</p>
                      <p className="font-medium text-foreground">{material.enrolled} students</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} color="var(--color-accent)" />
                      <span className="text-sm font-medium text-foreground">{material.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye" iconSize={14}>
                        Preview
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Settings" iconSize={14}>
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Class Assignments</h3>
                <p className="text-sm text-muted-foreground">Assign curriculum to classes and teachers</p>
              </div>
              <Button variant="default" iconName="UserPlus" iconPosition="left" iconSize={16}>
                Create Assignment
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" />
              <h3 className="font-medium text-foreground mt-4 mb-2">No Assignments Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by creating class assignments to organize your curriculum delivery
              </p>
              <Button variant="default" iconName="Plus" iconPosition="left" iconSize={16}>
                Create First Assignment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumManager;