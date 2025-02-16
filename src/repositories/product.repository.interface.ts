import { Product } from '../models/product.model';

export interface IProductRepository {
  findAll(page: number, limit: number): Promise<Product[]>;
  findByCategory(categoryId: number): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  searchByName(name: string): Promise<Product[]>;
  decreaseAvailableQuantity(productId: number, quantity: number);
}