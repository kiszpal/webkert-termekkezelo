import {ProductDto} from '../product.dto';

export interface TransactionSaveRequest {
  userEmail: string;
  soldItem: ProductDto;
  itemCount: number;
}
