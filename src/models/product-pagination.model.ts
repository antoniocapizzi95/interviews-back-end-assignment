import { Product } from "./product.model";

export interface ProductPagination {
    data: Product[];
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  }