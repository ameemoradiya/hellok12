import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentManagementCard = ({ paymentData, onUpdatePayment, onViewInvoice }) => {
  const [showTransactions, setShowTransactions] = useState(false);

  const getSubscriptionStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'expiring': return 'text-warning';
      case 'expired': return 'text-error';
      case 'cancelled': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getSubscriptionStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'expiring': return 'AlertTriangle';
      case 'expired': return 'XCircle';
      case 'cancelled': return 'Pause';
      default: return 'Circle';
    }
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Payment & Billing</h3>
        <Icon name="CreditCard" size={20} color="var(--color-foreground)" />
      </div>

      {/* Subscription Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`${getSubscriptionStatusColor(paymentData.subscription.status)}`}>
              <Icon name={getSubscriptionStatusIcon(paymentData.subscription.status)} size={20} />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{paymentData.subscription.plan}</h4>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(paymentData.subscription.amount)}/{paymentData.subscription.interval}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${getSubscriptionStatusColor(paymentData.subscription.status)}`}>
              {paymentData.subscription.status.charAt(0).toUpperCase() + paymentData.subscription.status.slice(1)}
            </p>
            <p className="text-xs text-muted-foreground">
              {paymentData.subscription.status === 'active' ? 'Renews' : 'Expires'} {formatDate(paymentData.subscription.nextBilling)}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Payment Method</h4>
        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
              <Icon name="CreditCard" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                •••• •••• •••• {paymentData.paymentMethod.last4}
              </p>
              <p className="text-xs text-muted-foreground">
                {paymentData.paymentMethod.brand.toUpperCase()} • Expires {paymentData.paymentMethod.expiry}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            iconSize={14}
            onClick={onUpdatePayment}
          >
            Update
          </Button>
        </div>
      </div>

      {/* Upcoming Charges */}
      {paymentData.upcomingCharges && paymentData.upcomingCharges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-3">Upcoming Charges</h4>
          <div className="space-y-2">
            {paymentData.upcomingCharges.map((charge, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{charge.description}</p>
                  <p className="text-xs text-muted-foreground">Due {formatDate(charge.dueDate)}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {formatCurrency(charge.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transaction History Toggle */}
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          iconName={showTransactions ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
          onClick={() => setShowTransactions(!showTransactions)}
          className="w-full justify-between"
        >
          Transaction History
        </Button>
      </div>

      {/* Transaction History */}
      {showTransactions && (
        <div className="space-y-3">
          {paymentData.transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.status === 'completed' ? 'bg-success/10' : 
                  transaction.status === 'pending' ? 'bg-warning/10' : 'bg-error/10'
                }`}>
                  <Icon 
                    name={
                      transaction.status === 'completed' ? 'CheckCircle' :
                      transaction.status === 'pending' ? 'Clock' : 'XCircle'
                    } 
                    size={16} 
                    color={
                      transaction.status === 'completed' ? 'var(--color-success)' :
                      transaction.status === 'pending' ? 'var(--color-warning)' : 'var(--color-error)'
                    }
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)} • {transaction.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-semibold text-foreground">
                  {formatCurrency(transaction.amount)}
                </p>
                {transaction.invoiceUrl && (
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="Download"
                    iconSize={14}
                    onClick={() => onViewInvoice(transaction)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          iconSize={16}
          onClick={onUpdatePayment}
          className="flex-1"
        >
          Manage Billing
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="FileText"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          View All Invoices
        </Button>
      </div>
    </div>
  );
};

export default PaymentManagementCard;