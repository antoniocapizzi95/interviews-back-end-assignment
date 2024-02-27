import { OrdersService } from './orders.service';
import { PaymentServiceFactory } from '../payments/payment.service.factory';
import { ProductRepository } from '../repositories/mocks/product.repository';
import { OrderRepository } from '../repositories/mocks/order.repository';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let paymentServiceFactory: PaymentServiceFactory;
  let productRepository: ProductRepository;
  let orderRepository: OrderRepository;

  beforeEach(() => {
    paymentServiceFactory = new PaymentServiceFactory();
    productRepository = new ProductRepository();
    orderRepository = new OrderRepository();
    ordersService = new OrdersService(paymentServiceFactory, productRepository, orderRepository);
    process.env = {
      DISABLE_PAYMENT: 'true'
    };
  });

  it('should validate order items successfully', async () => {
    // create a mock order with valid items
    const orderRequest = {
      items: [{ productId: 1, quantity: 2 }],
      totalAmount: 200,
      paymentDetails: null
    };

    await expect(ordersService.validateOrderItems(orderRequest)).resolves.not.toThrow();
  });

  it('should validate order items with insufficient stocks', async () => {
    // create a mock order with invalid items
    const orderRequest = {
      items: [{ productId: 2, quantity: 50 }],
      totalAmount: 2500,
      paymentDetails: null
    };

    await expect(ordersService.validateOrderItems(orderRequest)).rejects.toThrow('Insufficient stock for product ID 2');
  });

  it('should throw an error when validating order items with invalid product ID', async () => {
    // create a mock order with invalid product ID
    const orderRequest = {
      items: [{ productId: 999, quantity: 2 }],
      totalAmount: 20,
      paymentDetails: null
    };

    await expect(ordersService.validateOrderItems(orderRequest)).rejects.toThrow('Product with ID 999 not found');
  });

  it('should decrease quantity of products successfully', async () => {
    // create a mock order with valid items
    const orderRequest = {
      items: [{ productId: 1, quantity: 1 }],
      totalAmount: 100,
      paymentDetails: null
    };

    await expect(ordersService.decreaseQuantity(orderRequest)).resolves.not.toThrow();
  });

  it('should save order successfully', async () => {
    // create a mock order with valid items
    const orderRequest = {
      items: [{ productId: 1, quantity: 1 }],
      totalAmount: 10,
      paymentDetails: null
    };

    const orderId = await ordersService.saveOrder(orderRequest);
    expect(orderId).toEqual(expect.any(Number));
  });

  it('should finalize order successfully', async () => {
    // create a mock order with valid items
    const orderRequest = {
      items: [{ productId: 1, quantity: 1 }],
      totalAmount: 100,
      paymentDetails: null
    };

    const orderId = await ordersService.finalizeOrder(orderRequest);
    expect(orderId).toEqual(expect.any(Number));
  });

  it('should process order successfully', async () => {
    // create a mock order with valid items
    const orderRequest = {
      items: [{ productId: 1, quantity: 1 }],
      totalAmount: 100,
      paymentDetails: { method: 'credit card', cardNumber: '1234', expiryMonth: '12', expiryYear: '28', cvv: '123' }
    };

    const orderResponse = await ordersService.processOrder(orderRequest);
    expect(orderResponse.success).toBe(true);
    expect(orderResponse.message).toBe('Order processed successfully');
  });

  it('should get all orders successfully', async () => {
    const allOrders = await ordersService.getAllOrders();
    expect(allOrders).toEqual(expect.any(Array));
  });
});