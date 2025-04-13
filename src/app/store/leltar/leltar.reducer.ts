import {Leltar} from '../../interfaces/leltar';
import {createReducer, on} from '@ngrx/store';
import {LeltarActions} from './leltar.actions';

export const leltarFeatureKey = 'leltar';

export interface LeltarState {
  leltar?: Leltar;
}

export const initialState: LeltarState = {
  leltar: undefined
};

export const leltarReducer = createReducer(
  initialState,
  on(LeltarActions.leltarListSuccess, (_state, { stat }) => ({
    ..._state,
    leltar: stat
  }))
);
