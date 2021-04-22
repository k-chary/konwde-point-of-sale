import { createReducer, on } from '@ngrx/store';
import {
  clearError,
  setError,
  productScanned,
  scanningComplete,
  startScanning,
} from './scanning.actions';

export interface Product {
  name: string;
  price: number;
}

export type ErrorCode = 'PRODUCT_NOT_FOUND' | null;

export const scanningFeatureKey = 'scanning';

export interface ScanningState {
  products: Product[];
  error: ErrorCode;
  complete: boolean;
}

export const initialScanningState: ScanningState = {
  products: [],
  error: null,
  complete: false,
};

export const scanningReducer = createReducer<ScanningState>(
  initialScanningState,
  on(startScanning, (state) => ({
    ...state,
    complete: false,
    products: [],
  })),
  on(productScanned, (state, { name, price }) => ({
    ...state,
    products: [...state.products, { name, price }],
  })),
  on(clearError, (state) => ({
    ...state,
    error: null,
  })),
  on(setError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(scanningComplete, (state) => ({
    ...state,
    complete: true,
  }))
);
