import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ teacher, selectedDate, onDateSelect, selectedTimeSlot, onTimeSlotSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [userTimezone, setUserTimezone] = useState('');

  useEffect(() => {
    // Get user's timezone
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    
    // Generate time slots for selected date
    if (selectedDate) {
      generateTimeSlots(selectedDate);
    }
  }, [selectedDate, teacher]);

  const generateTimeSlots = (date) => {
    const slots = [];
    const startHour = 8; // 8 AM
    const endHour = 20; // 8 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = new Date(date);
        slotTime.setHours(hour, minute, 0, 0);
        
        // Simulate availability based on teacher's schedule
        const isAvailable = Math.random() > 0.3; // 70% availability
        const isBooked = !isAvailable && Math.random() > 0.5;
        
        slots.push({
          time: slotTime,
          available: isAvailable,
          booked: isBooked,
          price: teacher?.hourlyRate || 25
        });
      }
    }
    
    setTimeSlots(slots);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = date < new Date().setHours(0, 0, 0, 0);
      
      days.push({
        date,
        day,
        isToday,
        isSelected,
        isPast,
        hasAvailability: !isPast && Math.random() > 0.2 // 80% of future days have availability
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatTimeSlot = (time) => {
    return time.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getSlotStatus = (slot) => {
    if (slot.booked) return 'booked';
    if (!slot.available) return 'unavailable';
    return 'available';
  };

  const getSlotClassName = (slot) => {
    const baseClass = "p-3 rounded-lg border text-sm font-medium transition-micro cursor-pointer";
    const status = getSlotStatus(slot);
    
    switch (status) {
      case 'available':
        return `${baseClass} border-success bg-success/10 text-success hover:bg-success/20`;
      case 'booked':
        return `${baseClass} border-error bg-error/10 text-error cursor-not-allowed`;
      case 'unavailable':
        return `${baseClass} border-border bg-muted text-muted-foreground cursor-not-allowed`;
      default:
        return baseClass;
    }
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Select Date & Time</h3>
          <div className="text-sm text-muted-foreground">
            Timezone: {userTimezone}
          </div>
        </div>
        
        {teacher && (
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <div className="font-medium text-foreground">{teacher.name}</div>
              <div className="text-sm text-muted-foreground">{teacher.title}</div>
            </div>
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h4>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              iconName="ChevronLeft"
              iconSize={16}
              onClick={() => navigateMonth(-1)}
            />
            <Button
              variant="outline"
              size="icon"
              iconName="ChevronRight"
              iconSize={16}
              onClick={() => navigateMonth(1)}
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div key={index} className="aspect-square">
              {day && (
                <button
                  onClick={() => !day.isPast && onDateSelect(day.date)}
                  disabled={day.isPast}
                  className={`w-full h-full rounded-lg text-sm font-medium transition-micro ${
                    day.isPast
                      ? 'text-muted-foreground cursor-not-allowed'
                      : day.isSelected
                      ? 'bg-primary text-primary-foreground'
                      : day.isToday
                      ? 'bg-accent text-accent-foreground hover:bg-accent/80'
                      : day.hasAvailability
                      ? 'hover:bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {day.day}
                  {day.hasAvailability && !day.isPast && (
                    <div className="w-1 h-1 bg-success rounded-full mx-auto mt-1" />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h4 className="font-medium text-foreground mb-4">
            Available Times - {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {timeSlots.map((slot, index) => {
              const status = getSlotStatus(slot);
              const isSelected = selectedTimeSlot && 
                slot.time.getTime() === selectedTimeSlot.time.getTime();
              
              return (
                <button
                  key={index}
                  onClick={() => status === 'available' && onTimeSlotSelect(slot)}
                  disabled={status !== 'available'}
                  className={`${getSlotClassName(slot)} ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div>{formatTimeSlot(slot.time)}</div>
                  {status === 'available' && (
                    <div className="text-xs mt-1">${slot.price}</div>
                  )}
                  {status === 'booked' && (
                    <div className="text-xs mt-1">Booked</div>
                  )}
                </button>
              );
            })}
          </div>
          
          {timeSlots.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" />
              <p className="mt-2">No time slots available for this date</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;