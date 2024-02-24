import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CategoriesController } from './categories/categories.controller';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { ProductRepository } from './repositories/mocks/product.repository';
import { CategoryRepository } from './repositories/mocks/category.repository';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { PaymentServiceFactory } from './payments/payment.service.factory';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, OrdersController],
  providers: [
    AppService,
    ProductsService,
    CategoriesService,
    ProductRepository,
    CategoryRepository,
    PaymentServiceFactory,
    OrdersService,
  ],
})
export class AppModule {}
