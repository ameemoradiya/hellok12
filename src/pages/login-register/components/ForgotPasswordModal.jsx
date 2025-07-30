import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Email, 2: Success
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleClose = () => {
    setStep(1);
    setEmail('');
    setError('');
    onClose();
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
                <Icon name="Key" size={20} color="var(--color-primary)" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {step === 1 ? 'Reset Password' : 'Check Your Email'}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              iconSize={16}
              onClick={handleClose}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    error={error}
                    required
                    className="mb-6"
                  />

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={handleClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      loading={loading}
                      className="flex-1"
                    >
                      Send Reset Link
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Mail" size={24} color="var(--color-success)" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-medium text-foreground mb-2">Next steps:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Check your email inbox</li>
                      <li>• Click the reset link in the email</li>
                      <li>• Create a new password</li>
                      <li>• Sign in with your new password</li>
                    </ul>
                  </div>

                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleClose}
                    fullWidth
                  >
                    Got it, thanks!
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Didn't receive the email? Check your spam folder or{' '}
                      <button
                        onClick={() => setStep(1)}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        try again
                      </button>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;