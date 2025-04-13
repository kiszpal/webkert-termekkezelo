import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../services/user.service';
import {UserActions} from './user.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService
  ) {
  }

  readonly register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userRegister),
      switchMap(({ username, email, password }) =>
        fromPromise(this.userService.register({
          username,
          email,
          password
        })).pipe(
          map(() => {
            return UserActions.userRegisterSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              UserActions.userRegisterFailed()
            )
          )
        )
      )
    )
  );

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userLogin),
      switchMap(({ email, password }) =>
        fromPromise(this.userService.login({
          email,
          password
        })).pipe(
          map((user) => {
            window.localStorage.setItem('user', JSON.stringify(user));
            return UserActions.userLoginSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              UserActions.userLoginFailed()
            )
          )
        )
      )
    )
  );
}
