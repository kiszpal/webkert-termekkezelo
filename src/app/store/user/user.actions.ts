import {createActionGroup, emptyProps, props} from '@ngrx/store';

enum UserActionEnums {
  USER_REGISTER = 'User register',
  USER_REGISTER_SUCCESS = 'User register success',
  USER_REGISTER_FAILED = 'User register failed',
  USER_LOGIN = 'User login',
  USER_LOGIN_SUCCESS = 'User login success',
  USER_LOGIN_FAILED = 'User login failed'
}

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    [UserActionEnums.USER_REGISTER]: props<{ username: string, email: string, password: string }>(),
    [UserActionEnums.USER_REGISTER_SUCCESS]: emptyProps(),
    [UserActionEnums.USER_REGISTER_FAILED]: emptyProps(),
    [UserActionEnums.USER_LOGIN]: props<{ email: string, password: string }>(),
    [UserActionEnums.USER_LOGIN_SUCCESS]: emptyProps(),
    [UserActionEnums.USER_LOGIN_FAILED]: emptyProps()
  }
});
