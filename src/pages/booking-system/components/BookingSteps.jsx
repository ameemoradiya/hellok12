import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingSteps = ({ currentStep, onStepClick }) => {
  const steps = [
    {
      id: 1,
      title: 'Select Teacher',
      description: 'Choose your preferred teacher',
      icon: 'UserCheck'
    },
    {
      id: 2,
      title: 'Pick Date & Time',
      description: 'Select available time slot',
      icon: 'Calendar'
    },
    {
      id: 3,
      title: 'Session Type',
      description: 'Choose session preferences',
      icon: 'Settings'
    },
    {
      id: 4,
      title: 'Confirm & Pay',
      description: 'Review and complete booking',
      icon: 'CreditCard'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClassName = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClassName = (stepId) => {
    const isCompleted = stepId < currentStep;
    return `flex-1 h-0.5 ${isCompleted ? 'bg-success' : 'bg-border'}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center space-y-2 flex-shrink-0">
              <button
                onClick={() => onStepClick && onStepClick(step.id)}
                disabled={step.id > currentStep}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-micro ${
                  getStepClassName(getStepStatus(step.id))
                } ${step.id <= currentStep ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
              >
                {getStepStatus(step.id) === 'completed' ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step.icon} size={20} />
                )}
              </button>
              
              <div className="text-center">
                <div className={`text-sm font-medium ${
                  getStepStatus(step.id) === 'current' ?'text-primary' 
                    : getStepStatus(step.id) === 'completed' ?'text-success' :'text-muted-foreground'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </div>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`hidden sm:block ${getConnectorClassName(step.id + 1)} mx-4`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile Progress Bar */}
      <div className="sm:hidden mt-4">
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </div>
      </div>
    </div>
  );
};

export default BookingSteps;