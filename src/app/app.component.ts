import { Component, OnInit } from '@angular/core';
import { defaultProducts, defaultStores } from './shared/default-values';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
  ) {}

  ngOnInit(): void {
    this.setDefaultValues();
  }

  private setDefaultValues(): void {
    if (localStorage.getItem('storeList')) return;

    localStorage.setItem('storeList', JSON.stringify(defaultStores));
    localStorage.setItem('productList', JSON.stringify(defaultProducts));
  }
}
