import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanningRoutingModule } from './scanning-routing.module';
import {
  DataAccessScanningModule,
  ScanningFacade,
} from '../data-access-scanning';

@NgModule({
  declarations: [],
  imports: [CommonModule, ScanningRoutingModule, DataAccessScanningModule],
  providers: [ScanningFacade],
})
export class ScanningModule {}
