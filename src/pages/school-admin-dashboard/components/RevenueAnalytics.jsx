import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueAnalytics = () => {
  const [activeChart, setActiveChart] = useState('monthly');

  const monthlyData = [
    { month: 'Jan', revenue: 18500, sessions: 245, commission: 3700 },
    { month: 'Feb', revenue: 22300, sessions: 298, commission: 4460 },
    { month: 'Mar', revenue: 19800, sessions: 267, commission: 3960 },
    { month: 'Apr', revenue: 25600, sessions: 342, commission: 5120 },
    { month: 'May', revenue: 28900, sessions: 389, commission: 5780 },
    { month: 'Jun', revenue: 31200, sessions: 418, commission: 6240 }
  ];

  const revenueSourceData = [
    { name: 'Subscription Fees', value: 45, color: '#2563EB' },
    { name: 'Session Bookings', value: 35, color: '#059669' },
    { name: 'Curriculum Sales', value: 15, color: '#F59E0B' },
    { name: 'Game Subscriptions', value: 5, color: '#EF4444' }
  ];

  const weeklyTrend = [
    { day: 'Mon', bookings: 45, revenue: 2250 },
    { day: 'Tue', bookings: 52, revenue: 2600 },
    { day: 'Wed', bookings: 48, revenue: 2400 },
    { day: 'Thu', bookings: 61, revenue: 3050 },
    { day: 'Fri', bookings: 55, revenue: 2750 },
    { day: 'Sat', bookings: 38, revenue: 1900 },
    { day: 'Sun', bookings: 29, revenue: 1450 }
  ];

  const chartTabs = [
    { id: 'monthly', label: 'Monthly Revenue', icon: 'BarChart3' },
    { id: 'sources', label: 'Revenue Sources', icon: 'PieChart' },
    { id: 'weekly', label: 'Weekly Trend', icon: 'TrendingUp' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-modal">
          <p className="text-foreground font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.dataKey === 'revenue' || entry.dataKey === 'commission' ? '$' : ''}{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">Revenue Analytics</h2>
          
          <div className="flex space-x-1">
            {chartTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChart(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-micro ${
                  activeChart === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeChart === 'monthly' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="DollarSign" size={16} color="var(--color-success)" />
                  <span className="text-sm text-muted-foreground">Total Revenue</span>
                </div>
                <p className="text-2xl font-bold text-foreground">$146,300</p>
                <p className="text-sm text-success">+24% from last period</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Calendar" size={16} color="var(--color-primary)" />
                  <span className="text-sm text-muted-foreground">Total Sessions</span>
                </div>
                <p className="text-2xl font-bold text-foreground">1,959</p>
                <p className="text-sm text-primary">+18% from last period</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Percent" size={16} color="var(--color-accent)" />
                  <span className="text-sm text-muted-foreground">Commission Earned</span>
                </div>
                <p className="text-2xl font-bold text-foreground">$29,260</p>
                <p className="text-sm text-accent">20% of total revenue</p>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="commission" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeChart === 'sources' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {revenueSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{
                        backgroundColor: 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground mb-4">Revenue Breakdown</h3>
                {revenueSourceData.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-foreground">{source.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-foreground">{source.value}%</span>
                      <p className="text-sm text-muted-foreground">
                        ${((source.value / 100) * 146300).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeChart === 'weekly' && (
          <div>
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-2">This Week's Performance</h3>
              <p className="text-muted-foreground">Daily booking trends and revenue generation</p>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="var(--color-primary)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-success)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconSize={14}>
              Export Data
            </Button>
            <Button variant="outline" size="sm" iconName="FileText" iconSize={14}>
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;