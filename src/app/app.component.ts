import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { defaultProducts, defaultStores } from './shared/default-values';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public buttonToShow: string = '';
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setDefaultValues();

    this.router.events
      .pipe(
        filter((event: any) => (event as unknown) instanceof NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((event: NavigationEnd) => {
        const [ lastPart ] = event.urlAfterRedirects.split('/').reverse();
        if (lastPart !== 'stores' && lastPart !== 'products') {
          this.buttonToShow = '';
        } else {
          this.buttonToShow = lastPart;
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setDefaultValues(): void {
    if (localStorage.getItem('storeList')) return;

    localStorage.setItem('storeList', JSON.stringify(defaultStores));
    localStorage.setItem('productList', JSON.stringify(defaultProducts));
  }
}
