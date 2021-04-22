import { createAction, props } from '@ngrx/store';
import { ErrorCode } from './scanning.reducer';

export const startScanning = createAction('[Scanning] Start Scanning');
export const scanningComplete = createAction('[Scanning] Scanning Complete');

export const productScanned = createAction(
  '[Scanning] Product Scanned',
  props<{ name: string; price: number }>()
);

export const setError = createAction(
  '[Scanning] Set Error',
  props<{ error: ErrorCode }>()
);
export const clearError = createAction('[Scanning] Clear Error');
