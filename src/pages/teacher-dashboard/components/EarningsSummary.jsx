import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EarningsSummary = ({ earnings }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');

  const periodOptions = [
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-year', label: 'This Year' }
  ];

  const currentEarnings = earnings[selectedPeriod] || earnings['this-month'];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Earnings Overview</h3>
        <Select
          options={periodOptions}
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          className="w-40"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-success/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="DollarSign" size={20} color="var(--color-success)" />
            <span className="text-xs text-success font-medium">+12.5%</span>
          </div>
          <div className="text-2xl font-bold text-success">${currentEarnings.gross}</div>
          <div className="text-sm text-muted-foreground">Gross Earnings</div>
        </div>

        <div className="bg-primary/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
            <span className="text-xs text-primary font-medium">+8.2%</span>
          </div>
          <div className="text-2xl font-bold text-primary">${currentEarnings.net}</div>
          <div className="text-sm text-muted-foreground">Net Earnings</div>
        </div>

        <div className="bg-accent/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Clock" size={20} color="var(--color-accent)" />
            <span className="text-xs text-accent font-medium">{currentEarnings.hours}h</span>
          </div>
          <div className="text-2xl font-bold text-accent">${currentEarnings.hourlyRate}</div>
          <div className="text-sm text-muted-foreground">Avg. Hourly Rate</div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Platform Commission (20%)</span>
          <span className="text-foreground">-${currentEarnings.commission}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Payment Processing</span>
          <span className="text-foreground">-${currentEarnings.processingFee}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-medium pt-2 border-t border-border">
          <span className="text-foreground">Next Payout</span>
          <span className="text-success">${currentEarnings.nextPayout}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Download Report
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="CreditCard"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Payout Settings
        </Button>
      </div>
    </div>
  );
};

export default EarningsSummary;