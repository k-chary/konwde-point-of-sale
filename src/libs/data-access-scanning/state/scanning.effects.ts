import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, mapTo, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  ItemWithPayload,
  ScanningError,
  ScanningService,
} from '../scanning.service';
import {
  clearError,
  productScanned,
  scanningComplete,
  setError,
  startScanning,
} from './scanning.actions';
import { Product, ScanningState } from './scanning.reducer';
import { getError } from './scanning.selectors';

@Injectable()
export class ScanningEffects {
  startScanning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startScanning),
      switchMap(() =>
        this.scanningService.scan().pipe(
          map((item) => {
            switch (item.type) {
              case 'complete':
                return scanningComplete();
              case 'error':
                return setError({
                  error: (item as ItemWithPayload<ScanningError>).data.code,
                });
              default:
                return productScanned((item as ItemWithPayload<Product>).data);
            }
          })
        )
      )
    )
  );

  clearError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(scanningComplete, productScanned),
      withLatestFrom(this.store.select(getError)),
      filter(([, error]) => Boolean(error)),
      mapTo(clearError())
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly scanningService: ScanningService,
    private readonly store: Store<ScanningState>
  ) {}
}
