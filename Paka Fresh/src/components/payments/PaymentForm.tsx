import React, { useState } from 'react';
import { CreditCard, Smartphone, QrCode } from 'lucide-react';
import { PaymentDetails, PaymentMethod, CreditCardDetails, UPIDetails } from '../../types';
import { CreditCardForm } from './CreditCardForm';
import { UPIForm } from './UPIForm';
import { QRCodePayment } from './QRCodePayment';
import { merchantConfig } from '../../config/merchant';

interface Props {
  onSubmit: (payment: PaymentDetails) => void;
  total: number;
  processing: boolean;
}

export function PaymentForm({ onSubmit, total, processing }: Props) {
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
          disabled={processing}
          className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
            method === 'credit-card' ? 'border-green-600 bg-green-50' : 'border-gray-300'
          } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <CreditCard size={20} />
          <span>Card</span>
        </button>
        
        <button
          onClick={() => setMethod('upi')}
          disabled={processing}
          className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
            method === 'upi' ? 'border-green-600 bg-green-50' : 'border-gray-300'
          } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Smartphone size={20} />
          <span>UPI</span>
        </button>
        
        <button
          onClick={() => setMethod('qr-code')}
          disabled={processing}
          className={`flex items-center justify-center gap-2 p-3 rounded-md border ${
            method === 'qr-code' ? 'border-green-600 bg-green-50' : 'border-gray-300'
          } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <QrCode size={20} />
          <span>QR Code</span>
        </button>
      </div>

      <div className="mt-6">
        {method === 'credit-card' && (
          <CreditCardForm 
            onSubmit={handleCreditCardSubmit} 
            total={total} 
            processing={processing}
            merchantName={merchantConfig.name}
          />
        )}
        {method === 'upi' && (
          <UPIForm 
            onSubmit={handleUPISubmit} 
            total={total} 
            processing={processing}
            merchantUpiId={merchantConfig.upiId}
          />
        )}
        {method === 'qr-code' && (
          <QRCodePayment 
            onComplete={handleQRComplete} 
            total={total} 
            processing={processing}
            merchantDetails={merchantConfig}
          />
        )}
      </div>
    </div>
  );
}