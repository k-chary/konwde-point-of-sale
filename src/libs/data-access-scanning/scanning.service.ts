import { Injectable } from '@angular/core';
import { from, Observable, timer } from 'rxjs';
import { concatMap, map, mapTo } from 'rxjs/operators';
import { ErrorCode, Product } from './state/scanning.reducer';

export type ItemType = 'error' | 'product' | 'complete';
export interface Item {
  type: ItemType;
}
export interface ItemWithPayload<T> extends Item {
  data: T;
}
export interface ScanningError {
  code: ErrorCode;
}

const products: Product[] = [
  {
    name: 'Banana',
    price: 10,
  },
  {
    name: 'Tomato',
    price: 7.5,
  },
  {
    name: 'Potato',
    price: 2.2,
  },
  {
    name: 'Apple',
    price: 3.5,
  },
  {
    name: 'Pumpkin',
    price: 9,
  },
  {
    name: 'Raddish',
    price: 15,
  },
];

@Injectable()
export class ScanningService {
  scan() {
    return new Observable<Item | ItemWithPayload<Product | ScanningError>>(
      (observer) => {
        this.getItems().subscribe({
          next: (product) => observer.next(product),
          complete: () => {
            observer.next({
              type: 'complete',
            });
            observer.complete();
          },
        });
      }
    ).pipe(
      concatMap((product) =>
        timer(2000 + Math.random() * 2000).pipe(mapTo(product))
      )
    );
  }

  private getItems(): Observable<ItemWithPayload<Product | ScanningError>> {
    return from(products).pipe(
      map((product) => {
        if (Math.random() < 0.4) {
          return {
            type: 'error' as ItemType,
            data: { code: 'PRODUCT_NOT_FOUND' as ErrorCode },
          };
        }

        return { type: 'product' as ItemType, data: product };
      })
    );
  }
}
