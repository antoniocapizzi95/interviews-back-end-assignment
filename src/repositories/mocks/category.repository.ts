import { Category } from '../../models/category.model';
import { ICategoryRepository } from '../category.repository.interface';

export class CategoryRepository implements ICategoryRepository {
  private categories: Category[];
  
  constructor() {
    this.categories = [
      {id: 1, name: 'category1'}
    ]
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findById(id: number): Promise<Category | undefined> {
    return this.categories.find(category => category.id === id);
  }
}