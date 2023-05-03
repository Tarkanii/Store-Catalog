import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IStore } from 'src/app/shared/interfaces/store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy {

  public productList: IProduct[] = [];
  private unsubscribe$: Subject<void> = new Subject();
  
  constructor(
    private productService: ProductService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.productService.products$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((productList: IProduct[]) => {
        this.productList = productList;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getStore(storeId: string): IStore {
    return this.storeService.getStore(storeId) as IStore;
  }

}
