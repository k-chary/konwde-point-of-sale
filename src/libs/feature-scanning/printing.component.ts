import { AfterViewInit, Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { ScanningFacade } from '../data-access-scanning';

@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.css'],
})
export class PrintingComponent implements AfterViewInit {
  products$ = this.scanningFacade.products$;

  constructor(private readonly scanningFacade: ScanningFacade) {}

  ngAfterViewInit() {
    this.products$.pipe(take(1)).subscribe(() => window.print());
  }
}
