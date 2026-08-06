export type GatewayProvider = 'STRIPE' | 'RAZORPAY';

export class PaymentGateway {
  public static async processPayment(amount: number, currency: string, sourceToken: string, provider: GatewayProvider = 'STRIPE') {
    console.log(`[Payment Gateway] Processing ${amount} ${currency} via ${provider}`);
    
    if (provider === 'STRIPE') {
      // return stripe.charges.create({ ... })
      return { success: true, transactionId: `pi_mock_${Date.now()}` };
    } else {
      // return razorpay.orders.create({ ... })
      return { success: true, transactionId: `order_mock_${Date.now()}` };
    }
  }

  public static async issueRefund(transactionId: string, amount: number, provider: GatewayProvider = 'STRIPE') {
    console.log(`[Payment Gateway] Issuing refund for ${transactionId} via ${provider}`);
    return { success: true, refundId: `re_mock_${Date.now()}` };
  }
}
