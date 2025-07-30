import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = ({ selectedChild, onBookSession, onManageBookings, onViewProgress, onShareReferral }) => {
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralCode] = useState('PARENT2024');
  const [copySuccess, setCopySuccess] = useState(false);

  const quickActions = [
    {
      id: 'book-session',
      title: 'Book New Session',
      description: 'Schedule a learning session',
      icon: 'Calendar',
      color: 'bg-primary',
      textColor: 'text-primary',
      bgColor: 'bg-primary/10',
      action: onBookSession,
      disabled: !selectedChild
    },
    {
      id: 'manage-bookings',
      title: 'Manage Bookings',
      description: 'View and modify sessions',
      icon: 'Settings',
      color: 'bg-secondary',
      textColor: 'text-secondary',
      bgColor: 'bg-secondary/10',
      action: onManageBookings
    },
    {
      id: 'view-progress',
      title: 'Progress Report',
      description: 'Detailed learning analytics',
      icon: 'TrendingUp',
      color: 'bg-success',
      textColor: 'text-success',
      bgColor: 'bg-success/10',
      action: onViewProgress,
      disabled: !selectedChild
    },
    {
      id: 'share-referral',
      title: 'Refer Friends',
      description: 'Earn rewards for referrals',
      icon: 'Share',
      color: 'bg-warning',
      textColor: 'text-warning',
      bgColor: 'bg-warning/10',
      action: () => setShowReferralModal(true)
    }
  ];

  const handleCopyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy referral code');
    }
  };

  const handleShareReferral = (platform) => {
    const referralUrl = `https://hellok12.com/signup?ref=${referralCode}`;
    const message = `Join HelloK12 and get amazing language learning sessions for your kids! Use my referral code: ${referralCode}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + referralUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralUrl)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Join HelloK12&body=${encodeURIComponent(message + '\n\n' + referralUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
    setShowReferralModal(false);
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <Icon name="Zap" size={20} color="var(--color-foreground)" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              disabled={action.disabled}
              className={`p-4 rounded-lg border border-border text-left transition-all hover:shadow-soft hover:scale-105 ${
                action.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.bgColor}`}>
                  <Icon name={action.icon} size={20} color={`var(--color-${action.color.split('-')[1]})`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{action.title}</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </button>
          ))}
        </div>

        {/* Additional Quick Stats */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Sessions This Month</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">$89</p>
              <p className="text-xs text-muted-foreground">Monthly Spending</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Active Children</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Modal */}
      {showReferralModal && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-1100"
            onClick={() => setShowReferralModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-1200 p-4">
            <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Refer Friends & Earn</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  iconSize={16}
                  onClick={() => setShowReferralModal(false)}
                />
              </div>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Share HelloK12 with friends and family. You'll both get 1 free session when they sign up!
                </p>
                
                <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                  <code className="flex-1 text-sm font-mono text-foreground">{referralCode}</code>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName={copySuccess ? "Check" : "Copy"}
                    iconPosition="left"
                    iconSize={14}
                    onClick={handleCopyReferralCode}
                  >
                    {copySuccess ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Share via:</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleShareReferral('whatsapp')}
                    className="justify-start"
                  >
                    WhatsApp
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Facebook"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleShareReferral('facebook')}
                    className="justify-start"
                  >
                    Facebook
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Twitter"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleShareReferral('twitter')}
                    className="justify-start"
                  >
                    Twitter
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Mail"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleShareReferral('email')}
                    className="justify-start"
                  >
                    Email
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-3 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Gift" size={16} color="var(--color-success)" />
                  <p className="text-sm text-success font-medium">Referral Rewards</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  You: 1 free session • Friend: 1 free session + 10% off first month
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuickActionsCard;