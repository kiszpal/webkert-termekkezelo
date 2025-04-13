import {ProductDto} from './product.dto';

export interface Transaction {
  id: string;
  userEmail: string;
  soldItem: ProductDto;
  itemCount: number;
  transactionDate: Date;
}
