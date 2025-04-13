import {ProductDto} from './product.dto';

export interface Leltar {
  id: string;
  userEmail: string;
  soldItems: ProductDto[];
  remainingItems: ProductDto[];
  mostPopularItems: ProductDto[];
  leltarDate: Date;
}
