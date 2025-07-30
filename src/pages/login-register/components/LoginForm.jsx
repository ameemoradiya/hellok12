import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onForgotPassword, className = '' }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for different roles
  const mockCredentials = {
    'student@example.com': { password: 'student123', role: 'student', dashboard: '/student-dashboard' },
    'parent@example.com': { password: 'parent123', role: 'parent', dashboard: '/parent-dashboard' },
    'teacher@example.com': { password: 'teacher123', role: 'teacher', dashboard: '/teacher-dashboard' },
    'admin@example.com': { password: 'admin123', role: 'admin', dashboard: '/school-admin-dashboard' }
  };

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const credential = mockCredentials[formData.emailOrPhone];
      
      if (credential && credential.password === formData.password) {
        // Store user session
        localStorage.setItem('userRole', credential.role);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Navigate to appropriate dashboard
        navigate(credential.dashboard);
      } else {
        setErrors({
          general: 'Invalid credentials. Try: student@example.com / student123, parent@example.com / parent123, teacher@example.com / teacher123, or admin@example.com / admin123'
        });
      }
      
      setLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/student-dashboard');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {errors.general && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <p className="text-sm text-error">{errors.general}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Email or Phone Number"
          type="text"
          name="emailOrPhone"
          placeholder="Enter your email or phone"
          value={formData.emailOrPhone}
          onChange={handleInputChange}
          error={errors.emailOrPhone}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
          
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={loading}
          fullWidth
          className="mt-6"
        >
          Sign In
        </Button>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            iconName="Chrome"
            iconPosition="left"
            iconSize={16}
            disabled={loading}
          >
            Google
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            iconName="Facebook"
            iconPosition="left"
            iconSize={16}
            disabled={loading}
          >
            Facebook
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;