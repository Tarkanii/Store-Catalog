import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { IProduct, IStore } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  public product: IProduct | null = null;
  public store: IStore | null = null;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: { [key: string]: string }) => {
        this.product = this.productService.getProduct(params?.['id']);
        if (!this.product) return;
        this.store = this.storeService.getStore(this.product?.storeId);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
