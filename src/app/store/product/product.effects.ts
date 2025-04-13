import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductService} from '../../services/product.service';
import {ProductActions} from './product.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService
  ) {}

  readonly createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.productCreate),
      switchMap(({ product }) =>
        fromPromise(this.productService.createProduct(product)).pipe(
          map(() => {
            return ProductActions.productCreateSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              ProductActions.productCreateFailed()
            )
          )
        )
      )
    )
  );

  readonly listProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.productList),
      switchMap(({ userEmail }) =>
        fromPromise(this.productService.listProducts(userEmail)).pipe(
          map((products) => {
            console.log(products);
            return ProductActions.productListSuccess({ products });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              ProductActions.productListFailed()
            )
          )
        )
      )
    )
  );
}
