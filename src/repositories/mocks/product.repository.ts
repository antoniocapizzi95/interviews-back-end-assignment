import { Product } from '../../models/product.model';
import { IProductRepository } from '../product.repository.interface';

export class ProductRepository implements IProductRepository {
  private products: Product[];

  constructor() {
    this.products = [
      {id: 1, name: 'prod1', image: 'imgurl', price: 100, availableQuantity: 10, categoryId: 1},
      {id: 2, name: 'prod2', image: 'imgurl', price: 50, availableQuantity: 20, categoryId: 1},
      {id: 3, name: 'prod3', image: 'imgurl', price: 70, availableQuantity: 50, categoryId: 2},
      {id: 4, name: 'prod4', image: 'imgurl', price: 200, availableQuantity: 5, categoryId: 3}
    ]
  }
  
  async decreaseAvailableQuantity(productId: number, quantity: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === productId) {
        if (this.products[i].availableQuantity < Math.abs(quantity)) {
          throw new Error(`Insufficient stock for product ID ${productId}`);
        }
        this.products[i].availableQuantity = this.products[i].availableQuantity - Math.abs(quantity);
        break;
      }
    }
  }

  async findById(id: number): Promise<Product> {
    return this.products.find(product => product.id === id);
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