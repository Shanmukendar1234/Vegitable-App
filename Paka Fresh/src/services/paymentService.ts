import { merchantConfig } from '../config/merchant';
import { PaymentDetails, CreditCardDetails, UPIDetails } from '../types';

export async function processPayment(payment: PaymentDetails, amount: number): Promise<{ success: boolean; transactionId: string }> {
  // In a real application, this would make API calls to a payment gateway
  // This is a simulation for demonstration purposes
  
  const transactionId = `TXN${Date.now()}`;
  
  switch (payment.method) {
    case 'credit-card': {
      const cardDetails = payment.data as CreditCardDetails;
      console.log('Processing credit card payment:', {
        amount,
        cardNumber: cardDetails.cardNumber.replace(/\d(?=\d{4})/g, "*"),
        cardHolder: cardDetails.name,
        merchantName: merchantConfig.name,
        merchantAccount: merchantConfig.bankDetails.accountNumber
      });
      break;
    }
    
    case 'upi': {
      const upiDetails = payment.data as UPIDetails;
      console.log('Processing UPI payment:', {
        amount,
        upiId: upiDetails.upiId,
        merchantUpiId: merchantConfig.upiId,
        merchantName: merchantConfig.name
      });
      break;
    }
    
    case 'qr-code': {
      console.log('Processing QR code payment:', {
        amount,
        merchantUpiId: merchantConfig.upiId,
        merchantName: merchantConfig.name
      });
      break;
    }
  }

  // Simulate successful payment
  return {
    success: true,
    transactionId
  };
}