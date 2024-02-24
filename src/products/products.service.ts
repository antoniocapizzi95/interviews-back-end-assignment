import { Injectable } from '@nestjs/common';
import { Product } from '../models/product.model';
import { ProductRepository } from '../repositories/mocks/product.repository';
import { CategoryRepository } from '../repositories/mocks/category.repository';
import { ProductPagination } from '../models/product-pagination.model';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository, private readonly categoryRepository: CategoryRepository) {}

  async findAll(page: number = 1, limit: number = 10): Promise<ProductPagination> {
    const products = await this.productRepository.findAll(page, limit);
    return this.mapToPagination(products, page, limit);
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error('The selected category is missing');
    }
    return this.productRepository.findByCategory(categoryId);
  }

  async searchByName(name: string): Promise<Product[]> {
    return this.productRepository.searchByName(name);
  }

  private mapToPagination(products: Product[], page: number, limit: number): ProductPagination {
    const totalItems = products.length;
    return {
      data: products,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalItems / limit),
      totalItems: totalItems,
    }
  }
}