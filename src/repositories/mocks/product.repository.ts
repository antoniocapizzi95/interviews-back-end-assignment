import { Product } from '../../models/product.model';
import { IProductRepository } from '../product.repository.interface';

export class ProductRepository implements IProductRepository {
  private products: Product[];

  constructor() {
    this.products = [
      {id: 1, name: 'prod1', image: 'imgurl', price: 100, availableQuantity: 10, categoryId: 1}
    ]
  }

  async findAll(page: number, limit: number): Promise<Product[]> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return this.products.slice(startIndex, endIndex);
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.products.filter(product => product.categoryId === categoryId);
  }

  async searchByName(name: string): Promise<Product[]> {
    return this.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
  }
}