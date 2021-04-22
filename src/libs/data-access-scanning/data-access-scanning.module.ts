import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromScanning from './state/scanning.reducer';
import { ScanningService } from './scanning.service';
import { EffectsModule } from '@ngrx/effects';
import { ScanningEffects } from './state/scanning.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromScanning.scanningFeatureKey,
      fromScanning.scanningReducer
    ),
    EffectsModule.forFeature([ScanningEffects]),
  ],
  providers: [ScanningService],
})
export class DataAccessScanningModule {}
