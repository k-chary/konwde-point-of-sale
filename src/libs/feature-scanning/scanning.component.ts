import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { delay, filter, map, mapTo, share, take } from 'rxjs/operators';
import { ScanningFacade } from '../data-access-scanning';
import {
  ErrorCode,
  Product,
} from '../data-access-scanning/state/scanning.reducer';

type NotificationType = 'ERROR' | 'PRODUCT' | 'COMPLETE';

interface Notification {
  type: NotificationType;
}

interface ProductNotification extends Notification {
  data: Product;
}

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.css'],
})
export class ScanningComponent implements OnInit {
  notification$: Observable<Notification> = this.getNotificationStream().pipe(
    share()
  );

  constructor(
    private readonly scanningFacade: ScanningFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.scanningFacade.startScanning();

    this.notification$
      .pipe(
        filter((notification) => notification.type === 'COMPLETE'),
        delay(1000),
        take(1)
      )
      .subscribe(() =>
        this.router.navigate(['print'], {
          relativeTo: this.activatedRoute,
          skipLocationChange: true,
        })
      );
  }

  private getNotificationStream() {
    const product$ = this.scanningFacade.latestProduct$.pipe(
      filter<Product>(Boolean),
      map<Product, ProductNotification>((product) => ({
        type: 'PRODUCT' as NotificationType,
        data: product,
      }))
    );
    const error$ = this.scanningFacade.error$.pipe(
      filter((error) => error === 'PRODUCT_NOT_FOUND'),
      mapTo<ErrorCode, Notification>({
        type: 'ERROR',
      })
    );
    const complete$ = this.scanningFacade.complete$.pipe(
      filter(Boolean),
      mapTo({ type: 'COMPLETE' as NotificationType })
    );

    return merge(product$, error$, complete$);
  }
}
