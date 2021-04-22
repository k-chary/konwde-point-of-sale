import { createFeatureSelector, createSelector } from '@ngrx/store';
import { scanningFeatureKey, ScanningState } from './scanning.reducer';

const scanningSelector = createFeatureSelector<ScanningState>(
  scanningFeatureKey
);

export const getProducts = createSelector(
  scanningSelector,
  (state) => state.products
);

export const getLatestProduct = createSelector(
  getProducts,
  (products) => products[products.length - 1]
);

export const getError = createSelector(
  scanningSelector,
  (state) => state.error
);

export const isComplete = createSelector(
  scanningSelector,
  (state) => state.complete
);
