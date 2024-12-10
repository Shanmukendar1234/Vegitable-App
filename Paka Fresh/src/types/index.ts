export interface Vegetable {
  id: number;
  name: string;
  price: number;
  image: string;
  unit: string;
  category: string;
  description: string;
}

export interface CartItem extends Vegetable {
  quantity: number;
}

export interface CreditCardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export interface UPIDetails {
  upiId: string;
}

export type PaymentMethod = 'credit-card' | 'upi' | 'qr-code';

export interface PaymentDetails {
  method: PaymentMethod;
  data: CreditCardDetails | UPIDetails | null;
}

export type Category = {
  id: string;
  name: string;
  description: string;
}