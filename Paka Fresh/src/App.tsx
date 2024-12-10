import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { vegetables } from './data/vegetables';
import { categories } from './data/categories';
import { CategorySection } from './components/CategorySection';
import { Cart } from './components/Cart';
import { PaymentForm } from './components/PaymentForm';
import { CartItem, PaymentDetails, Vegetable } from './types';
import { processPayment } from './services/paymentService';
import { merchantConfig } from './config/merchant';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<string | null>(null);

  const handleAddToCart = (vegetable: Vegetable) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === vegetable.id);
      if (existingItem) {
        return items.map(item =>
          item.id === vegetable.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...vegetable, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handlePayment = async (payment: PaymentDetails) => {
    setProcessing(true);
    try {
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const result = await processPayment(payment, total);
      
      if (result.success) {
        setLastTransaction(result.transactionId);
        setCartItems([]);
        setShowPayment(false);
        alert(`Payment successful! Transaction ID: ${result.transactionId}`);
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white py-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf size={24} />
              <h1 className="text-2xl font-bold">{merchantConfig.name}</h1>
            </div>
            <div className="text-sm">
              <p>{merchantConfig.phone}</p>
              <p>{merchantConfig.email}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {categories.map(category => (
              <CategorySection
                key={category.id}
                category={category}
                vegetables={vegetables}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24">
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
            />
            
            {cartItems.length > 0 && !showPayment && (
              <button
                onClick={() => setShowPayment(true)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Proceed to Payment
              </button>
            )}

            {showPayment && (
              <PaymentForm 
                onSubmit={handlePayment} 
                total={total} 
                processing={processing}
              />
            )}

            {lastTransaction && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-green-800">
                  Last Transaction ID: {lastTransaction}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;