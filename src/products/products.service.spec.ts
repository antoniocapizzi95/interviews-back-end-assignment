import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductRepository } from '../repositories/mocks/product.repository';
import { CategoryRepository } from '../repositories/mocks/category.repository';
import { Product } from '../models/product.model';
import { ProductPagination } from '../models/product-pagination.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepo: ProductRepository;
  let categoryRepo: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        ProductRepository,
        CategoryRepository,
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepo = module.get<ProductRepository>(ProductRepository);
    categoryRepo = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return paginated products', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', image: '', price: 100, availableQuantity: 10, categoryId: 1 },
    ];
    const mockPagination: ProductPagination = {
      data: mockProducts,
      page: 1,
      limit: 10,
      totalPages: 1,
      totalItems: mockProducts.length,
    };
    jest.spyOn(productRepo, 'findAll').mockResolvedValue(mockProducts);

    const result = await service.findAll(1, 10);
    expect(result).toEqual(mockPagination);
    expect(productRepo.findAll).toHaveBeenCalledWith(1, 10);
  });

  it('should throw an error if the category does not exist', async () => {
    jest.spyOn(categoryRepo, 'findById').mockResolvedValue(undefined);

    await expect(service.findByCategory(999)).rejects.toThrow('The selected category is missing');
  });

  it('should return products matching the name', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Apple', image: '', price: 100, availableQuantity: 10, categoryId: 1 },
    ];
    jest.spyOn(productRepo, 'searchByName').mockResolvedValue(mockProducts);

    const result = await service.searchByName('Apple');
    expect(result).toEqual(mockProducts);
    expect(productRepo.searchByName).toHaveBeenCalledWith('Apple');
  });
});