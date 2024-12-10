import React from 'react';
import { Plus } from 'lucide-react';
import { Vegetable } from '../types';

interface Props {
  vegetable: Vegetable;
  onAddToCart: (vegetable: Vegetable) => void;
}

export function VegetableCard({ vegetable, onAddToCart }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={vegetable.image} 
        alt={vegetable.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{vegetable.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{vegetable.description}</p>
        <p className="text-gray-600">${vegetable.price.toFixed(2)} / {vegetable.unit}</p>
        <button
          onClick={() => onAddToCart(vegetable)}
          className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}