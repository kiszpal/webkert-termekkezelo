import {Product} from '../../interfaces/product';
import {createReducer, on} from '@ngrx/store';
import {ProductActions} from './product.actions';

export const productFeatureKey = 'products';

export interface ProductState {
  products: Product[];
}

export const initialState: ProductState = {
  products: []
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.productListSuccess, (_state, { products }) => ({
    ..._state,
    products: products.map((prod, i) => ({
      ...prod,
      isClicked: false,
      id: i + 1
    }))
  }))
);
