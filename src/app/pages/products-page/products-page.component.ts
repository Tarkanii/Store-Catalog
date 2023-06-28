import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { IProduct, IStore} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  public productList: Observable<IProduct[]> = this.productService.products$;
  
  constructor(
    private productService: ProductService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  public getStore(storeId: string): IStore {
    return this.storeService.getStore(storeId) as IStore;
  }

}
