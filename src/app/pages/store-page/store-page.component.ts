import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { IProduct, IStore } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})
export class StorePageComponent implements OnInit, OnDestroy {

  public store: IStore | null = null;
  public products: IProduct[] = [];
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(((params: { [key: string]: string }) => {
          this.store = this.storeService.getStore(params?.['id']);
          return this.productService.products$;
        })),
        map((products: IProduct[]) => {
          return products.filter((product: IProduct) => product.storeId === this.store?.id)
        })
      )
      .subscribe((products: IProduct[]) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
