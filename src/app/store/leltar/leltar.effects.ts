import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LeltarService} from '../../services/leltar.service';
import {LeltarActions} from './leltar.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class LeltarEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly leltarService: LeltarService
  ) {}

  readonly createLeltar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeltarActions.leltarCreate),
      switchMap(({ startDate, endDate }) =>
        fromPromise(this.leltarService.createLeltar(startDate, endDate)).pipe(
          map(() => {
            return LeltarActions.leltarCreateSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              LeltarActions.leltarCreateFailed()
            )
          )
        )
      )
    )
  );

  readonly listLeltar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeltarActions.leltarList),
      switchMap(({ startDate, endDate }) =>
        fromPromise(this.leltarService.listLeltar(startDate, endDate)).pipe(
          map((leltar) => {
            return LeltarActions.leltarListSuccess({ stat: leltar });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              LeltarActions.leltarListFailed()
            )
          )
        )
      )
    )
  )

}
