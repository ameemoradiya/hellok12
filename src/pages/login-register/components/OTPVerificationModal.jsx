import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OTPVerificationModal = ({ isOpen, onClose, onVerified, phoneNumber }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  useEffect(() => {
    if (isOpen) {
      // Focus first input when modal opens
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    // Focus last filled input or next empty one
    const lastFilledIndex = newOtp.findIndex(digit => !digit);
    const focusIndex = lastFilledIndex === -1 ? 5 : Math.max(0, lastFilledIndex - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Mock OTP verification (accept any 6-digit code)
      if (otpString === '123456' || otpString.length === 6) {
        onVerified();
      } else {
        setError('Invalid OTP. Try 123456 for demo purposes.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimeLeft(60);
    setOtp(['', '', '', '', '', '']);
    setError('');
    
    // Simulate resend API call
    setTimeout(() => {
      // Focus first input after resend
      inputRefs.current[0]?.focus();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-1100" />
      
      {/* Modal */}
      <div className="fixed inset-0 z-1200 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Smartphone" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Verify Phone Number</h3>
                <p className="text-sm text-muted-foreground">
                  Code sent to {phoneNumber}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              iconSize={16}
              onClick={onClose}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Enter the 6-digit verification code sent to your phone
            </p>

            {/* OTP Input */}
            <div className="flex justify-center space-x-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                  <p className="text-sm text-error">{error}</p>
                </div>
              </div>
            )}

            {/* Timer and Resend */}
            <div className="text-center mb-6">
              {!canResend ? (
                <p className="text-sm text-muted-foreground">
                  Resend code in {timeLeft}s
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Resend verification code
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="lg"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              
              <Button
                variant="default"
                size="lg"
                onClick={handleVerify}
                loading={loading}
                className="flex-1"
              >
                Verify
              </Button>
            </div>

            {/* Demo Hint */}
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                <Icon name="Info" size={12} className="inline mr-1" />
                Demo: Use 123456 as OTP or any 6-digit code
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerificationModal;