import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';
import { IProduct, IStore } from '../shared/interfaces';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private storeList: IStore[] = [];
  public stores$: BehaviorSubject<IStore[]> = new BehaviorSubject(this.storeList);

  constructor(
    private productService: ProductService
  ) { 
    this.loadStoresFromStorage();
  }

  private loadStoresFromStorage(): void {
    if (!localStorage.getItem('storeList')) return;

    this.storeList = JSON.parse(localStorage.getItem('storeList') as string);
    this.stores$.next(this.storeList);
  };

  public addStore(name: string, address: string, description: string = ''): void {
    const newStore = { id: v4(), name, description, address };
    this.storeList = [...this.storeList, newStore];
    localStorage.setItem('storeList', JSON.stringify(this.storeList));
    this.loadStoresFromStorage();
  }

  public removeStore(id: string): void {
    this.storeList = this.storeList.filter((store: IStore) => store.id !== id);
    this.productService.getProductsForStore(id).forEach((product: IProduct) => {
      this.productService.removeProduct(product.id);
    })
    
    localStorage.setItem('storeList', JSON.stringify(this.storeList));
    this.loadStoresFromStorage();
  }

  public getStore(id: string): IStore | null {
    return this.storeList.find((store: IStore) => store.id === id) || null;
  }

  public getAllStores(): IStore[] {
    return this.stores$.value;
  }
}
