import {createFeatureSelector, createSelector} from '@ngrx/store';
import {leltarFeatureKey, LeltarState} from './leltar.reducer';

const selectFeature = createFeatureSelector<LeltarState>(leltarFeatureKey);

export const selectLeltar = createSelector(
  selectFeature,
  ({ leltar }) => leltar
);
