import { Injectable } from '@nestjs/common';
import { PaymentServiceFactory } from '../payments/payment.service.factory';
import { IPaymentService } from '../payments/payment.service.interface';
import { OrderResponse } from '../models/order-response.model';
import { OrderRequest } from '../models/order-request.model';
import { ProductRepository } from '../repositories/mocks/product.repository';
import { Order } from '../models/order.model';
import { OrderRepository } from '../repositories/mocks/order.repository';
import { PaymentResponse } from '../models/payment-response.model';

@Injectable()
export class OrdersService {
  private readonly paymentService: IPaymentService;
  constructor(
    private paymentServiceFactory: PaymentServiceFactory,
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private disablePayment: boolean
    ) {
    this.paymentService = this.paymentServiceFactory.createPaymentService('Service1');
    this.disablePayment = process.env.DISABLE_PAYMENT === 'true'
  }

  async validateOrderItems(order: OrderRequest) {
    for (const item of order.items) {
      const product = await this.productRepository.findById(item.productId);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (product.availableQuantity < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.productId}`);
      }

      const expectedTotalPrice = product.price * item.quantity;
      if (order.totalAmount < expectedTotalPrice) {
        throw new Error(`Incorrect total amount for product ID ${item.productId}`);
      }
    }
  }

  async decreaseQuantity(orderReq: OrderRequest) {
    for (const item of orderReq.items) {
      await this.productRepository.decreaseAvailableQuantity(item.productId, item.quantity);
    }
  }

  async saveOrder(orderReq: OrderRequest): Promise<number> {
    const newOrder: Order = {
      items: orderReq.items,
      totalAmount: orderReq.totalAmount
    };
    return this.orderRepository.addOrder(newOrder);
  }

  async finalizeOrder(orderReq: OrderRequest): Promise<number> {
    await this.decreaseQuantity(orderReq);
    return this.saveOrder(orderReq);
  }

  async processOrder(orderReq: OrderRequest): Promise<OrderResponse> {
    try {
      await this.validateOrderItems(orderReq);

      let paymentResponse: PaymentResponse = {
        transactionId: '',
        status: 'approved'
      }

      if (!this.disablePayment) {
        paymentResponse = await this.paymentService.processPayment({
          ...orderReq.paymentDetails,
          amount: orderReq.totalAmount,
        })
      }
      
      if (paymentResponse.status === 'approved') {
        const orderId = await this.finalizeOrder(orderReq);
        return { success: true, message: 'Order processed successfully', orderId: orderId, transactionId: paymentResponse.transactionId };
      }

      return { success: false, message: 'Payment failed' };
    } catch (error) {
      return { success: false, message: `Error creating order: ${error.message}`};
    }
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.getOrders();
  }
}