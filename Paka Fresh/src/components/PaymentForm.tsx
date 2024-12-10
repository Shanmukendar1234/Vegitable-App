import React, { useState } from 'react';
import { CreditCard, Smartphone, QrCode } from 'lucide-react';
import { PaymentDetails, PaymentMethod, CreditCardDetails, UPIDetails } from '../types';
import { CreditCardForm } from './payments/CreditCardForm';
import { UPIForm } from './payments/UPIForm';
import { QRCodePayment } from './payments/QRCodePayment';

interface Props {
  onSubmit: (payment: PaymentDetails) => void;
  total: number;
}

export function PaymentForm({ onSubmit, total }: Props) {
  const [method, setMethod] = useState<PaymentMethod>('credit-card');

  const handleCreditCardSubmit = (details: CreditCardDetails) => {
    onSubmit({ method: 'credit-card', data: details });
  };

  const handleUPISubmit = (details: UPIDetails) => {
    onSubmit({ method: 'upi', data: details });
  };

  const handleQRComplete = () => {
    onSubmit({ method: 'qr-code', data: null });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setMethod('credit-card')}
          className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
            method === 'credit-card' ? 'border-green-600 bg-green-50' : 'border-gray-300'
          }`}
        >
          <CreditCard size={20} />
          <span>Card</span>
        </button>
        
        <button
          onClick={() => setMethod('upi')}
          className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
            method === 'upi' ? 'border-green-600 bg-green-50' : 'border-gray-300'
          }`}
        >
          <Smartphone size={20} />
          <span>UPI</span>
        </button>
        
        <button
          onClick={() => setMethod('qr-code')}
          className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
            method === 'qr-code' ? 'border-green-600 bg-green-50' : 'border-gray-300'
          }`}
        >
          <QrCode size={20} />
          <span>QR Code</span>
        </button>
      </div>

      <div className="mt-6">
        {method === 'credit-card' && (
          <CreditCardForm onSubmit={handleCreditCardSubmit} total={total} />
        )}
        {method === 'upi' && (
          <UPIForm onSubmit={handleUPISubmit} total={total} />
        )}
        {method === 'qr-code' && (
          <QRCodePayment onComplete={handleQRComplete} total={total} />
        )}
      </div>
    </div>
  );
}