import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintingComponent } from './printing.component';
import { ScanningComponent } from './scanning.component';

const routes: Routes = [
  {
    path: '',
    component: ScanningComponent,
  },
  {
    path: 'print',
    component: PrintingComponent,
  },
];

@NgModule({
  declarations: [ScanningComponent, PrintingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ScanningRoutingModule {}
