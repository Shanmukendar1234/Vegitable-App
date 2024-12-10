import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { UPIDetails } from '../../types';

interface Props {
  onSubmit: (details: UPIDetails) => void;
  total: number;
}

export function UPIForm({ onSubmit, total }: Props) {
  const [upiId, setUpiId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ upiId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="text-green-600" />
        <h3 className="text-lg font-semibold">UPI Payment</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">UPI ID</label>
        <input
          type="text"
          placeholder="username@upi"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
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