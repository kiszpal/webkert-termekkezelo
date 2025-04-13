import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TransactionService} from '../../services/transaction.service';
import {TransactionActions} from './transactions.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class TransactionsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly transactionService: TransactionService
  ) {}

  readonly saveTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.transactionSave),
      switchMap(({ req }) =>
        fromPromise(this.transactionService.saveTransaction(req)).pipe(
          map(() => {
            return TransactionActions.transactionSaveSuccess()
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              TransactionActions.transactionSaveFailed()
            )
          )
        )
      )
    )
  );
}
