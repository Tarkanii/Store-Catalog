import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productList: IProduct[] = [];
  public products$: BehaviorSubject<IProduct[]> = new BehaviorSubject(this.productList); 

  constructor() { 
    this.loadProductsFromStorage();
  }

  private loadProductsFromStorage(): void {
    if (!localStorage.getItem('productList')) return;

    this.productList = JSON.parse(localStorage.getItem('productList') as string);
    this.products$.next(this.productList);
  };

  public addProduct(name: string, price: number, storeId: string, description: string = ''): void {
    const newProduct = { id: v4(), name, price, description, storeId };
    this.productList = [...this.productList, newProduct];
    localStorage.setItem('productList', JSON.stringify(this.productList));
    this.loadProductsFromStorage();
  }

  public removeProduct(id: string): void {
    this.productList = this.productList.filter((product: IProduct) => product.id !== id);
    localStorage.setItem('productList', JSON.stringify(this.productList));
    this.loadProductsFromStorage();
  }

  public getProduct(id: string): IProduct | null {
    return this.productList.find((product: IProduct) => product.id === id) || null;
  }

  private getAllProducts(): IProduct[] {
    return this.products$.value;
  }

  public getProductsForStore(storeId: string): IProduct[] {
    return this.getAllProducts().filter((product: IProduct) => product.storeId === storeId);
  }
}
