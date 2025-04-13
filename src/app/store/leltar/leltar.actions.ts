import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Leltar} from '../../interfaces/leltar';

enum LeltarActionEnum {
  LELTAR_CREATE = 'Leltar create',
  LELTAR_CREATE_SUCCESS = 'Leltar create success',
  LELTAR_CREATE_FAILED = 'Leltar create failed',
  LELTAR_LIST = 'Leltar list',
  LELTAR_LIST_SUCCESS = 'Leltar list success',
  LELTAR_LIST_FAILED = 'Leltar list failed'
}

export const LeltarActions = createActionGroup({
  source: 'Stats',
  events: {
    [LeltarActionEnum.LELTAR_CREATE]: props<{ startDate: Date, endDate: Date }>(),
    [LeltarActionEnum.LELTAR_CREATE_SUCCESS]: emptyProps(),
    [LeltarActionEnum.LELTAR_CREATE_FAILED]: emptyProps(),
    [LeltarActionEnum.LELTAR_LIST]: props<{ startDate: Date, endDate: Date }>(),
    [LeltarActionEnum.LELTAR_LIST_SUCCESS]: props<{ stat: Leltar }>(),
    [LeltarActionEnum.LELTAR_LIST_FAILED]: emptyProps()
  }
});
