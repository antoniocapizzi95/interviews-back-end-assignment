import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CategoriesController } from './categories/categories.controller';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { ProductRepository } from './repositories/mocks/product.repository';
import { CategoryRepository } from './repositories/mocks/category.repository';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController],
  providers: [
    AppService,
    ProductsService,
    CategoriesService,
    ProductRepository,
    CategoryRepository,
  ],
})
export class AppModule {}
