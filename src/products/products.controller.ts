import { Controller, Get, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    return this.productsService.findAll(pageNum, limitNum);
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    const categoryIdNum = parseInt(categoryId, 10)
    return this.productsService.findByCategory(categoryIdNum);
  }

  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.productsService.searchByName(name);
  }
}