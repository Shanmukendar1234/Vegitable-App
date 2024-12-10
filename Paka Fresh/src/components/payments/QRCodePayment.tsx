import React from 'react';
import QRCodeReact from 'qrcode.react';
import { QrCode } from 'lucide-react';

interface Props {
  total: number;
  onComplete: () => void;
}

export function QRCodePayment({ total, onComplete }: Props) {
  // Generate a payment link (in a real app, this would be from your backend)
  const paymentData = JSON.stringify({
    amount: total,
    merchantId: 'DEMO123',
    timestamp: new Date().toISOString()
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <QrCode className="text-green-600" />
        <h3 className="text-lg font-semibold">Scan QR Code</h3>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCodeReact value={paymentData} size={200} />
        </div>
        <p className="text-sm text-gray-600">
          Scan this QR code with your payment app to complete the purchase
        </p>
        <p className="font-semibold">Amount: ${total.toFixed(2)}</p>
        
        {/* In a real app, this would be triggered by a webhook */}
        <button
          onClick={onComplete}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          I've completed the payment
        </button>
      </div>
    </div>
  );
}