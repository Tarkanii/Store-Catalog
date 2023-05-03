import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { IStore } from 'src/app/shared/interfaces/store';

@Component({
  selector: 'app-stores-page',
  templateUrl: './stores-page.component.html',
  styleUrls: ['./stores-page.component.css']
})
export class StoresPageComponent implements OnInit, OnDestroy {

  public storeList: IStore[] = [];
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.stores$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((storeList: IStore[]) => {
        this.storeList = storeList;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
