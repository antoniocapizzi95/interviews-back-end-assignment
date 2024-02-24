import { Injectable } from '@nestjs/common';
import { PaymentServiceFactory } from '../payments/payment.service.factory';
import { IPaymentService } from '../payments/payment.service.interface';
import { OrderResponse } from '../models/order-response.model';
import { OrderRequest } from '../models/order-request.model';

@Injectable()
export class OrdersService {
  private readonly paymentService: IPaymentService;
  constructor(private paymentServiceFactory: PaymentServiceFactory) {
    this.paymentService =this.paymentServiceFactory.createPaymentService('Service1');
  }

  async processOrder(orderReq: OrderRequest): Promise<OrderResponse> {
    // TODO: check order validity

    const paymentResponse = await this.paymentService.processPayment({
      ...orderReq.paymentDetails,
      amount: orderReq.totalAmount,
    })
    if (paymentResponse.status === 'approved') {
      return { success: true, message: 'Order processed successfully', transactionId: paymentResponse.transactionId };
    }
    return { success: false, message: 'Payment failed' };
  }
}