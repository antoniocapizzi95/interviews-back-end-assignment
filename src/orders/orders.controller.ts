import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderRequest } from '../models/order-request.model';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async placeOrder(@Body() order: OrderRequest) {
    return this.ordersService.processOrder(order);
  }
}