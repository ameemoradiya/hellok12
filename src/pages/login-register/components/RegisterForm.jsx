import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import RoleSelector from './RoleSelector';
import OTPVerificationModal from './OTPVerificationModal';

const RegisterForm = ({ className = '' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    if (!selectedRole) {
      setErrors({ role: 'Please select your role' });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowOTPModal(true);
    }, 1500);
  };

  const handleOTPVerified = () => {
    setShowOTPModal(false);
    
    // Store user session
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('isAuthenticated', 'true');
    
    // Navigate to appropriate dashboard
    const dashboardRoutes = {
      'student': '/student-dashboard',
      'parent': '/parent-dashboard',
      'teacher': '/teacher-dashboard',
      'school-admin': '/school-admin-dashboard'
    };
    
    navigate(dashboardRoutes[selectedRole] || '/student-dashboard');
  };

  const getRoleSpecificFields = () => {
    switch (selectedRole) {
      case 'student':
        return (
          <div className="space-y-4">
            <Input
              label="Grade Level"
              type="text"
              name="grade"
              placeholder="e.g., 5th Grade"
              value={formData.grade || ''}
              onChange={handleInputChange}
            />
            <Input
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ''}
              onChange={handleInputChange}
            />
          </div>
        );
      case 'parent':
        return (
          <div className="space-y-4">
            <Input
              label="Number of Children"
              type="number"
              name="childrenCount"
              placeholder="How many children do you have?"
              value={formData.childrenCount || ''}
              onChange={handleInputChange}
              min="1"
            />
          </div>
        );
      case 'teacher':
        return (
          <div className="space-y-4">
            <Input
              label="Teaching Experience (Years)"
              type="number"
              name="experience"
              placeholder="Years of teaching experience"
              value={formData.experience || ''}
              onChange={handleInputChange}
              min="0"
            />
            <Input
              label="Specialization"
              type="text"
              name="specialization"
              placeholder="e.g., English, Mathematics, Science"
              value={formData.specialization || ''}
              onChange={handleInputChange}
            />
          </div>
        );
      case 'school-admin':
        return (
          <div className="space-y-4">
            <Input
              label="Position/Title"
              type="text"
              name="position"
              placeholder="e.g., Principal, Vice Principal"
              value={formData.position || ''}
              onChange={handleInputChange}
            />
            <Input
              label="Employee ID"
              type="text"
              name="employeeId"
              placeholder="Your employee identification"
              value={formData.employeeId || ''}
              onChange={handleInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={className}>
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of 2</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / 2) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {currentStep === 1 && (
          <div>
            <RoleSelector
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
            />
            
            {errors.role && (
              <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                  <p className="text-sm text-error">{errors.role}</p>
                </div>
              </div>
            )}

            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={handleNext}
              fullWidth
              className="mt-6"
              disabled={!selectedRole}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  required
                />

                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                required
              />

              {getRoleSpecificFields()}

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                description="Must be at least 8 characters long"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                required
              />

              <div className="space-y-3">
                <Checkbox
                  label="I agree to the Terms of Service and Privacy Policy"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  error={errors.agreeToTerms}
                  required
                />

                <Checkbox
                  label="I would like to receive marketing communications"
                  name="agreeToMarketing"
                  checked={formData.agreeToMarketing}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleBack}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={loading}
                className="flex-1"
              >
                Create Account
              </Button>
            </div>
          </form>
        )}
      </div>

      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerified={handleOTPVerified}
        phoneNumber={formData.phone}
      />
    </>
  );
};

export default RegisterForm;