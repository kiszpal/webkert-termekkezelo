import {createFeatureSelector, createSelector} from '@ngrx/store';
import {productFeatureKey, ProductState} from './product.reducer';

const selectFeature = createFeatureSelector<ProductState>(productFeatureKey);

export const selectProducts = createSelector(
  selectFeature,
  ({ products }) => products
);
