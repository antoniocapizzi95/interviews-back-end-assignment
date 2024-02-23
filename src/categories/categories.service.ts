import { Injectable } from '@nestjs/common';
import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/mocks/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}