import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ProductSaveRequest} from '../../interfaces/requests/product.request';
import {ProductDto} from '../../interfaces/product.dto';

enum ProductActionEnums {
  PRODUCT_CREATE = 'Product create',
  PRODUCT_CREATE_SUCCESS = 'Product create success',
  PRODUCT_CREATE_FAILED = 'Product create failed',
  PRODUCT_LIST = 'Product list',
  PRODUCT_LIST_SUCCESS = 'Product list success',
  PRODUCT_LIST_FAILED = 'Product list failed',
  PRODUCT_DELETE = 'Product delete',
  PRODUCT_DELETE_SUCCESS = 'Product delete success',
  PRODUCT_DELETE_FAILED = 'Product delete failed'
}

export const ProductActions = createActionGroup({
  source: 'Products',
  events: {
    [ProductActionEnums.PRODUCT_CREATE]: props<{ product: ProductSaveRequest }>(),
    [ProductActionEnums.PRODUCT_CREATE_SUCCESS]: emptyProps(),
    [ProductActionEnums.PRODUCT_CREATE_FAILED]: emptyProps(),
    [ProductActionEnums.PRODUCT_LIST]: props<{ userEmail: string }>(),
    [ProductActionEnums.PRODUCT_LIST_SUCCESS]: props<{ products: ProductDto[] }>(),
    [ProductActionEnums.PRODUCT_LIST_FAILED]: emptyProps(),
    [ProductActionEnums.PRODUCT_DELETE]: props<{ id: number }>(),
    [ProductActionEnums.PRODUCT_DELETE_SUCCESS]: emptyProps(),
    [ProductActionEnums.PRODUCT_DELETE_FAILED]: emptyProps()
  }
});
