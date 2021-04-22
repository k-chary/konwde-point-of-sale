import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { startScanning } from './scanning.actions';
import { ScanningState } from './scanning.reducer';
import {
  getError,
  getLatestProduct,
  getProducts,
  isComplete,
} from './scanning.selectors';

@Injectable()
export class ScanningFacade {
  products$ = this.store.pipe(select(getProducts));
  latestProduct$ = this.store.pipe(select(getLatestProduct));
  error$ = this.store.pipe(select(getError));
  complete$ = this.store.pipe(select(isComplete));

  constructor(private readonly store: Store<ScanningState>) {}

  startScanning() {
    this.store.dispatch(startScanning());
  }
}
