import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import TeacherCard from './components/TeacherCard';
import TeacherFilters from './components/TeacherFilters';
import CalendarView from './components/CalendarView';
import SessionTypeSelector from './components/SessionTypeSelector';
import BookingConfirmation from './components/BookingConfirmation';
import BookingHistory from './components/BookingHistory';
import BookingSteps from './components/BookingSteps';

const BookingSystem = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('book');
  const [userRole, setUserRole] = useState('student');
  const [isProcessing, setIsProcessing] = useState(false);

  // Booking state
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [sessionType, setSessionType] = useState('individual');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringOptions, setRecurringOptions] = useState({
    frequency: 'weekly',
    duration: '1-month',
    startDate: new Date().toISOString().split('T')[0]
  });

  // Filter state
  const [filters, setFilters] = useState({
    subject: 'all',
    availability: 'all',
    experience: 'all',
    rating: 'all',
    priceMin: '',
    priceMax: '',
    search: '',
    nativeSpeaker: false,
    certified: false,
    groupSessions: false,
    packageDiscounts: false,
    trialSession: false,
    weekendAvailable: false
  });

  // Teachers data
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    // Determine user role from URL or localStorage
    const path = window.location.pathname;
    if (path.includes('student')) setUserRole('student');
    else if (path.includes('parent')) setUserRole('parent');
    else if (path.includes('teacher')) setUserRole('teacher');
    else if (path.includes('admin')) setUserRole('admin');

    // Mock teachers data
    const mockTeachers = [
      {
        id: 'T001',
        name: 'Sarah Johnson',
        title: 'English Literature Specialist',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        rating: 4.9,
        reviewCount: 127,
        experience: 8,
        completedSessions: 1250,
        responseTime: '< 1 hour',
        hourlyRate: 25,
        packageDiscount: 15,
        availability: 'available',
        specializations: ['English Literature', 'Creative Writing', 'Grammar', 'IELTS Prep'],
        languages: ['English (Native)', 'Spanish (Fluent)'],
        isNativeSpeaker: true,
        isCertified: true,
        offersGroupSessions: true,
        hasPackageDiscounts: true,
        offersTrialSession: true,
        weekendAvailable: true
      },
      {
        id: 'T002',
        name: 'Michael Chen',
        title: 'Mathematics & Physics Tutor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        rating: 4.8,
        reviewCount: 89,
        experience: 5,
        completedSessions: 890,
        responseTime: '2 hours',
        hourlyRate: 30,
        packageDiscount: 10,
        availability: 'busy',
        specializations: ['Algebra', 'Calculus', 'Physics', 'SAT Math'],
        languages: ['English (Fluent)', 'Mandarin (Native)'],
        isNativeSpeaker: false,
        isCertified: true,
        offersGroupSessions: true,
        hasPackageDiscounts: true,
        offersTrialSession: false,
        weekendAvailable: false
      },
      {
        id: 'T003',
        name: 'Lisa Rodriguez',
        title: 'Spanish Language Expert',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        rating: 4.7,
        reviewCount: 156,
        experience: 12,
        completedSessions: 2100,
        responseTime: '30 min',
        hourlyRate: 28,
        packageDiscount: 20,
        availability: 'available',
        specializations: ['Spanish Conversation', 'Business Spanish', 'DELE Prep', 'Grammar'],
        languages: ['Spanish (Native)', 'English (Fluent)', 'Portuguese (Basic)'],
        isNativeSpeaker: true,
        isCertified: true,
        offersGroupSessions: false,
        hasPackageDiscounts: true,
        offersTrialSession: true,
        weekendAvailable: true
      },
      {
        id: 'T004',
        name: 'David Kim',
        title: 'Science & Technology Educator',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        rating: 4.9,
        reviewCount: 203,
        experience: 10,
        completedSessions: 1800,
        responseTime: '1 hour',
        hourlyRate: 35,
        packageDiscount: 12,
        availability: 'available',
        specializations: ['Computer Science', 'Chemistry', 'Biology', 'AP Sciences'],
        languages: ['English (Fluent)', 'Korean (Native)'],
        isNativeSpeaker: false,
        isCertified: true,
        offersGroupSessions: true,
        hasPackageDiscounts: true,
        offersTrialSession: true,
        weekendAvailable: true
      },
      {
        id: 'T005',
        name: 'Emma Thompson',
        title: 'French Language & Culture',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        rating: 4.6,
        reviewCount: 78,
        experience: 6,
        completedSessions: 650,
        responseTime: '3 hours',
        hourlyRate: 22,
        packageDiscount: 8,
        availability: 'offline',
        specializations: ['French Conversation', 'French Literature', 'DELF Prep', 'Pronunciation'],
        languages: ['French (Native)', 'English (Fluent)', 'Italian (Basic)'],
        isNativeSpeaker: true,
        isCertified: false,
        offersGroupSessions: true,
        hasPackageDiscounts: false,
        offersTrialSession: true,
        weekendAvailable: false
      },
      {
        id: 'T006',
        name: 'Ahmed Hassan',
        title: 'Arabic & Islamic Studies',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
        rating: 4.8,
        reviewCount: 92,
        experience: 15,
        completedSessions: 1400,
        responseTime: '45 min',
        hourlyRate: 26,
        packageDiscount: 18,
        availability: 'available',
        specializations: ['Modern Standard Arabic', 'Quranic Arabic', 'Islamic History', 'Calligraphy'],
        languages: ['Arabic (Native)', 'English (Fluent)', 'French (Basic)'],
        isNativeSpeaker: true,
        isCertified: true,
        offersGroupSessions: true,
        hasPackageDiscounts: true,
        offersTrialSession: true,
        weekendAvailable: true
      }
    ];

    setTeachers(mockTeachers);
    setFilteredTeachers(mockTeachers);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = teachers.filter(teacher => {
      // Subject filter
      if (filters.subject !== 'all') {
        const subjectMatch = teacher.specializations.some(spec => 
          spec.toLowerCase().includes(filters.subject.toLowerCase())
        );
        if (!subjectMatch) return false;
      }

      // Availability filter
      if (filters.availability !== 'all') {
        if (filters.availability === 'available' && teacher.availability !== 'available') return false;
        // Add more availability logic here
      }

      // Experience filter
      if (filters.experience !== 'all') {
        const [min, max] = filters.experience.includes('+') 
          ? [parseInt(filters.experience), Infinity]
          : filters.experience.split('-').map(n => parseInt(n));
        if (teacher.experience < min || (max !== Infinity && teacher.experience > max)) return false;
      }

      // Rating filter
      if (filters.rating !== 'all') {
        const minRating = parseFloat(filters.rating.replace('+', ''));
        if (teacher.rating < minRating) return false;
      }

      // Price range filter
      if (filters.priceMin && teacher.hourlyRate < parseInt(filters.priceMin)) return false;
      if (filters.priceMax && teacher.hourlyRate > parseInt(filters.priceMax)) return false;

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesName = teacher.name.toLowerCase().includes(searchTerm);
        const matchesSpecialization = teacher.specializations.some(spec => 
          spec.toLowerCase().includes(searchTerm)
        );
        if (!matchesName && !matchesSpecialization) return false;
      }

      // Boolean filters
      if (filters.nativeSpeaker && !teacher.isNativeSpeaker) return false;
      if (filters.certified && !teacher.isCertified) return false;
      if (filters.groupSessions && !teacher.offersGroupSessions) return false;
      if (filters.packageDiscounts && !teacher.hasPackageDiscounts) return false;
      if (filters.trialSession && !teacher.offersTrialSession) return false;
      if (filters.weekendAvailable && !teacher.weekendAvailable) return false;

      return true;
    });

    setFilteredTeachers(filtered);
  }, [teachers, filters]);

  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher(teacher);
    setCurrentStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setCurrentStep(3);
  };

  const handleSessionTypeComplete = () => {
    setCurrentStep(4);
  };

  const handleBookingConfirm = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock successful booking
    const bookingId = 'BK' + Date.now().toString().slice(-6);
    
    setIsProcessing(false);
    
    // Show success message and redirect
    alert(`Booking confirmed! Booking ID: ${bookingId}\nYou will receive a confirmation email shortly.`);
    
    // Reset booking state
    setCurrentStep(1);
    setSelectedTeacher(null);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setActiveTab('history');
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      subject: 'all',
      availability: 'all',
      experience: 'all',
      rating: 'all',
      priceMin: '',
      priceMax: '',
      search: '',
      nativeSpeaker: false,
      certified: false,
      groupSessions: false,
      packageDiscounts: false,
      trialSession: false,
      weekendAvailable: false
    });
  };

  const bookingDetails = {
    teacher: selectedTeacher,
    selectedDate,
    selectedTimeSlot,
    sessionType,
    isRecurring,
    recurringOptions
  };

  const tabs = [
    { id: 'book', label: 'Book Session', icon: 'Plus' },
    { id: 'history', label: 'My Bookings', icon: 'History' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Booking System</h1>
                <p className="text-muted-foreground mt-2">
                  Schedule your learning sessions with expert teachers
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => window.open('https://calendar.google.com', '_blank')}
                >
                  My Calendar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  iconSize={16}
                >
                  Messages
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-micro ${
                    activeTab === tab.id
                      ? 'bg-card text-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {activeTab === 'book' ? (
            <div className="space-y-6">
              {/* Booking Steps */}
              <BookingSteps 
                currentStep={currentStep} 
                onStepClick={handleStepClick}
              />

              {/* Step Content */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <TeacherFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters}
                  />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        Available Teachers ({filteredTeachers.length})
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Info" size={16} />
                        <span>Click on a teacher to select and continue</span>
                      </div>
                    </div>
                    
                    {filteredTeachers.length === 0 ? (
                      <div className="text-center py-12 bg-card rounded-lg border border-border">
                        <Icon name="Search" size={48} color="var(--color-muted-foreground)" />
                        <h4 className="text-lg font-medium text-foreground mt-4">No teachers found</h4>
                        <p className="text-muted-foreground mt-2">
                          Try adjusting your filters to see more results
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={handleClearFilters}
                        >
                          Clear All Filters
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeachers.map((teacher) => (
                          <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                            onSelect={handleTeacherSelect}
                            isSelected={selectedTeacher?.id === teacher.id}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <CalendarView
                  teacher={selectedTeacher}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  selectedTimeSlot={selectedTimeSlot}
                  onTimeSlotSelect={handleTimeSlotSelect}
                />
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <SessionTypeSelector
                    sessionType={sessionType}
                    onSessionTypeChange={setSessionType}
                    isRecurring={isRecurring}
                    onRecurringChange={setIsRecurring}
                    recurringOptions={recurringOptions}
                    onRecurringOptionsChange={setRecurringOptions}
                  />
                  
                  <div className="flex justify-end">
                    <Button
                      variant="default"
                      onClick={handleSessionTypeComplete}
                      disabled={!sessionType}
                      iconName="ArrowRight"
                      iconPosition="right"
                      iconSize={16}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <BookingConfirmation
                  bookingDetails={bookingDetails}
                  onConfirm={handleBookingConfirm}
                  onBack={() => setCurrentStep(3)}
                  isProcessing={isProcessing}
                />
              )}
            </div>
          ) : (
            <BookingHistory userRole={userRole} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;