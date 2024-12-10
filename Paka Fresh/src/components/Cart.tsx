import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export function Cart({ items, onUpdateQuantity, onRemove }: Props) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <ShoppingCart />
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center gap-2">
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} / {item.unit}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
              className="w-16 px-2 py-1 border rounded"
            />
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}