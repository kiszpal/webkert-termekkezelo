import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {TransactionSaveRequest} from '../../interfaces/requests/transaction.request';

enum TransactionActionEnums {
  TRANSACTION_SAVE = 'Transaction save',
  TRANSACTION_SAVE_SUCCESS = 'Transaction save success',
  TRANSACTION_SAVE_FAILED = 'Transaction save failed'
}

export const TransactionActions = createActionGroup({
  source: 'Transactions',
  events: {
    [TransactionActionEnums.TRANSACTION_SAVE]: props<{ req: TransactionSaveRequest }>(),
    [TransactionActionEnums.TRANSACTION_SAVE_SUCCESS]: emptyProps(),
    [TransactionActionEnums.TRANSACTION_SAVE_FAILED]: emptyProps()
  }
});
