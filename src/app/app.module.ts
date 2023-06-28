import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StoresPageComponent } from './pages/stores-page/stores-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { StorePageComponent } from './pages/store-page/store-page.component';
import { AddStorePageComponent } from './pages/add-store-page/add-store-page.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StoresPageComponent,
    ProductsPageComponent,
    ProductPageComponent,
    StorePageComponent,
    AddStorePageComponent,
    AddProductPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
