import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresPageComponent } from './pages/stores-page/stores-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AddStorePageComponent } from './pages/add-store-page/add-store-page.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { StorePageComponent } from './pages/store-page/store-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AddProductGuard } from './shared/guards/add-product.guard';

const routes: Routes = [
  { path: '', redirectTo: '/stores', pathMatch: 'full' },
  {
    path: 'stores', children: [
      { path: '', pathMatch: 'full', component: StoresPageComponent },
      { path: 'add-store', pathMatch: 'full', component: AddStorePageComponent },
      { path: ':id', component: StorePageComponent }
    ]
  },
  {
    path: 'products', children: [
      { path: '', pathMatch: 'full', component: ProductsPageComponent },
      { path: 'add-product', canActivate: [AddProductGuard], pathMatch: 'full', component: AddProductPageComponent },
      { path: ':id', component: ProductPageComponent }
    ]
  },
  { path: '**', redirectTo: '/stores' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }