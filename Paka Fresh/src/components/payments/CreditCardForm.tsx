import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { CreditCardDetails } from '../../types';

interface Props {
  onSubmit: (details: CreditCardDetails) => void;
  total: number;
}

export function CreditCardForm({ onSubmit, total }: Props) {
  const [details, setDetails] = useState<CreditCardDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="text-green-600" />
        <h3 className="text-lg font-semibold">Credit Card Payment</h3>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          value={details.cardNumber}
          onChange={(e) => setDetails({ ...details, cardNumber: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={details.expiryDate}
            onChange={(e) => setDetails({ ...details, expiryDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            placeholder="123"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={details.cvv}
            onChange={(e) => setDetails({ ...details, cvv: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        Pay ${total.toFixed(2)}
      </button>
    </form>
  );
}