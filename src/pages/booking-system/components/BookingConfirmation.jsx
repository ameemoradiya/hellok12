import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookingConfirmation = ({ 
  bookingDetails, 
  onConfirm, 
  onBack, 
  isProcessing 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [addToCalendar, setAddToCalendar] = useState(true);
  const [sendReminders, setSendReminders] = useState(true);

  const calculateTotal = () => {
    const basePrice = bookingDetails.sessionType === 'individual' ? 25 : 
                     bookingDetails.sessionType === 'group' ? 15 : 45;
    
    let total = basePrice;
    
    // Apply recurring discount
    if (bookingDetails.isRecurring) {
      const discountMap = { weekly: 10, biweekly: 5, monthly: 15 };
      const discount = discountMap[bookingDetails.recurringOptions?.frequency] || 0;
      total = total * (1 - discount / 100);
    }
    
    // Platform fee
    const platformFee = total * 0.05; // 5% platform fee
    
    return {
      basePrice,
      discount: bookingDetails.isRecurring ? basePrice - total : 0,
      platformFee,
      total: total + platformFee
    };
  };

  const pricing = calculateTotal();

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
    { id: 'bank', name: 'Bank Transfer', icon: 'Building' }
  ];

  const calendarOptions = [
    { id: 'google', name: 'Google Calendar', icon: 'Calendar' },
    { id: 'apple', name: 'Apple Calendar', icon: 'Calendar' },
    { id: 'outlook', name: 'Outlook', icon: 'Calendar' },
    { id: 'ics', name: 'Download ICS', icon: 'Download' }
  ];

  const formatDateTime = (date, timeSlot) => {
    if (!date || !timeSlot) return 'Not selected';
    
    const sessionDate = new Date(date);
    const sessionTime = new Date(timeSlot.time);
    
    return `${sessionDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })} at ${sessionTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })}`;
  };

  const getSessionTypeDetails = () => {
    const types = {
      individual: { name: 'Individual Session', duration: '60 minutes', icon: 'User' },
      group: { name: 'Group Session', duration: '60 minutes', icon: 'Users' },
      intensive: { name: 'Intensive Session', duration: '120 minutes', icon: 'Zap' }
    };
    return types[bookingDetails.sessionType] || types.individual;
  };

  const sessionTypeDetails = getSessionTypeDetails();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Confirm Your Booking</h3>
        <Button
          variant="ghost"
          size="icon"
          iconName="ArrowLeft"
          iconSize={20}
          onClick={onBack}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Details */}
        <div className="space-y-6">
          {/* Teacher Info */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Teacher</h4>
            <div className="flex items-center space-x-3">
              <Image
                src={bookingDetails.teacher?.avatar}
                alt={bookingDetails.teacher?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-foreground">{bookingDetails.teacher?.name}</div>
                <div className="text-sm text-muted-foreground">{bookingDetails.teacher?.title}</div>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Star" size={14} color="var(--color-warning)" />
                  <span className="text-sm text-foreground">{bookingDetails.teacher?.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({bookingDetails.teacher?.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Session Details</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type:</span>
                <div className="flex items-center space-x-2">
                  <Icon name={sessionTypeDetails.icon} size={16} />
                  <span className="text-foreground">{sessionTypeDetails.name}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="text-foreground">{sessionTypeDetails.duration}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="text-foreground text-right">
                  {formatDateTime(bookingDetails.selectedDate, bookingDetails.selectedTimeSlot)}
                </span>
              </div>
              
              {bookingDetails.isRecurring && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Recurring:</span>
                    <span className="text-foreground capitalize">
                      {bookingDetails.recurringOptions?.frequency} for {bookingDetails.recurringOptions?.duration}
                    </span>
                  </div>
                  <div className="p-2 bg-success/10 rounded text-sm text-success">
                    <Icon name="Repeat" size={14} className="inline mr-1" />
                    Recurring sessions will be automatically booked and charged
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Meeting Details */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Meeting Information</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Video" size={16} color="var(--color-primary)" />
                <span className="text-foreground">Google Meet session</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">Join link will be sent 15 minutes before</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Globe" size={16} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">
                  Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Options */}
        <div className="space-y-6">
          {/* Pricing Breakdown */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Pricing</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session Price:</span>
                <span className="text-foreground">${pricing.basePrice.toFixed(2)}</span>
              </div>
              
              {pricing.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Recurring Discount:</span>
                  <span>-${pricing.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee (5%):</span>
                <span className="text-foreground">${pricing.platformFee.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total:</span>
                  <span className="text-foreground">${pricing.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Payment Method</h4>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-micro ${
                    paymentMethod === method.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <Icon name={method.icon} size={20} />
                  <span className="text-foreground">{method.name}</span>
                  {paymentMethod === method.id && (
                    <Icon name="Check" size={16} color="var(--color-success)" className="ml-auto" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Additional Options</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addToCalendar}
                  onChange={(e) => setAddToCalendar(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-foreground">Add to calendar</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendReminders}
                  onChange={(e) => setSendReminders(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-foreground">Send email & SMS reminders</span>
              </label>
            </div>

            {addToCalendar && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Add to:</p>
                <div className="grid grid-cols-2 gap-2">
                  {calendarOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      size="sm"
                      iconName={option.icon}
                      iconPosition="left"
                      iconSize={14}
                      className="justify-start"
                    >
                      {option.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirmation Button */}
          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={onConfirm}
            loading={isProcessing}
            iconName="CreditCard"
            iconPosition="left"
            iconSize={20}
          >
            {isProcessing ? 'Processing Payment...' : `Pay $${pricing.total.toFixed(2)} & Confirm Booking`}
          </Button>

          <div className="text-xs text-muted-foreground text-center">
            By confirming, you agree to our Terms of Service and Privacy Policy.
            You can cancel or reschedule up to 24 hours before the session.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;