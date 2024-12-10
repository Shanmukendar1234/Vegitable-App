import React from 'react';
import { Category, Vegetable } from '../types';
import { VegetableCard } from './VegetableCard';

interface Props {
  category: Category;
  vegetables: Vegetable[];
  onAddToCart: (vegetable: Vegetable) => void;
}

export function CategorySection({ category, vegetables, onAddToCart }: Props) {
  const categoryVegetables = vegetables.filter(v => v.category === category.id);

  if (categoryVegetables.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{category.name}</h2>
        <p className="text-gray-600">{category.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryVegetables.map(vegetable => (
          <VegetableCard
            key={vegetable.id}
            vegetable={vegetable}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}