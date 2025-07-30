import React from 'react';
import Icon from '../../../components/AppIcon';

import { Checkbox } from '../../../components/ui/Checkbox';

const SessionTypeSelector = ({ 
  sessionType, 
  onSessionTypeChange, 
  isRecurring, 
  onRecurringChange,
  recurringOptions,
  onRecurringOptionsChange 
}) => {
  const sessionTypes = [
    {
      id: 'individual',
      name: 'Individual Session',
      description: 'One-on-one personalized learning',
      icon: 'User',
      price: 25,
      duration: '60 minutes',
      features: ['Personalized attention', 'Flexible curriculum', 'Direct feedback']
    },
    {
      id: 'group',
      name: 'Group Session',
      description: 'Learn with other students (2-6 people)',
      icon: 'Users',
      price: 15,
      duration: '60 minutes',
      discount: '40% off individual price',
      features: ['Interactive learning', 'Peer collaboration', 'Cost effective']
    },
    {
      id: 'intensive',
      name: 'Intensive Session',
      description: 'Extended focused learning session',
      icon: 'Zap',
      price: 45,
      duration: '120 minutes',
      features: ['Deep dive learning', 'Comprehensive coverage', 'Maximum progress']
    }
  ];

  const recurringFrequencies = [
    { value: 'weekly', label: 'Weekly', discount: 10 },
    { value: 'biweekly', label: 'Bi-weekly', discount: 5 },
    { value: 'monthly', label: 'Monthly', discount: 15 }
  ];

  const packageOptions = [
    { sessions: 4, discount: 10, popular: false },
    { sessions: 8, discount: 15, popular: true },
    { sessions: 12, discount: 20, popular: false }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-semibold text-foreground mb-4">Choose Session Type</h3>
      
      {/* Session Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {sessionTypes.map((type) => (
          <div
            key={type.id}
            className={`p-4 rounded-lg border cursor-pointer transition-micro ${
              sessionType === type.id
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onClick={() => onSessionTypeChange(type.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                sessionType === type.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <Icon 
                  name={type.icon} 
                  size={20} 
                  color={sessionType === type.id ? 'white' : 'var(--color-muted-foreground)'} 
                />
              </div>
              {sessionType === type.id && (
                <Icon name="Check" size={20} color="var(--color-success)" />
              )}
            </div>
            
            <h4 className="font-medium text-foreground mb-1">{type.name}</h4>
            <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-lg font-semibold text-foreground">${type.price}</span>
                <span className="text-sm text-muted-foreground">/{type.duration}</span>
              </div>
              {type.discount && (
                <span className="text-xs text-success font-medium">{type.discount}</span>
              )}
            </div>
            
            <ul className="space-y-1">
              {type.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Check" size={12} color="var(--color-success)" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Package Options */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Session Packages (Save More)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {packageOptions.map((pkg) => {
            const basePrice = sessionTypes.find(t => t.id === sessionType)?.price || 25;
            const totalPrice = pkg.sessions * basePrice;
            const discountAmount = (totalPrice * pkg.discount) / 100;
            const finalPrice = totalPrice - discountAmount;
            
            return (
              <div
                key={pkg.sessions}
                className={`relative p-3 rounded-lg border cursor-pointer transition-micro ${
                  pkg.popular ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="font-semibold text-foreground">{pkg.sessions} Sessions</div>
                  <div className="text-sm text-muted-foreground line-through">${totalPrice}</div>
                  <div className="text-lg font-bold text-primary">${finalPrice}</div>
                  <div className="text-xs text-success">Save {pkg.discount}% (${discountAmount})</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recurring Options */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center space-x-3 mb-4">
          <Checkbox
            checked={isRecurring}
            onChange={(e) => onRecurringChange(e.target.checked)}
          />
          <div>
            <label className="font-medium text-foreground">Make this a recurring session</label>
            <p className="text-sm text-muted-foreground">Save money with regular bookings</p>
          </div>
        </div>

        {isRecurring && (
          <div className="ml-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Frequency</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {recurringFrequencies.map((freq) => (
                  <button
                    key={freq.value}
                    onClick={() => onRecurringOptionsChange({
                      ...recurringOptions,
                      frequency: freq.value
                    })}
                    className={`p-3 rounded-lg border text-sm transition-micro ${
                      recurringOptions.frequency === freq.value
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium">{freq.label}</div>
                    <div className="text-xs text-success">Save {freq.discount}%</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Duration</label>
                <select
                  value={recurringOptions.duration}
                  onChange={(e) => onRecurringOptionsChange({
                    ...recurringOptions,
                    duration: e.target.value
                  })}
                  className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
                >
                  <option value="1-month">1 Month</option>
                  <option value="3-months">3 Months</option>
                  <option value="6-months">6 Months</option>
                  <option value="1-year">1 Year</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Start Date</label>
                <input
                  type="date"
                  value={recurringOptions.startDate}
                  onChange={(e) => onRecurringOptionsChange({
                    ...recurringOptions,
                    startDate: e.target.value
                  })}
                  className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="p-3 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Info" size={16} />
                <span className="text-sm font-medium">Recurring Session Benefits</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-success">
                <li>• Guaranteed time slot reservation</li>
                <li>• Automatic booking and payment</li>
                <li>• Cancel or modify anytime</li>
                <li>• Progress tracking across sessions</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionTypeSelector;