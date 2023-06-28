import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { IStore } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-stores-page',
  templateUrl: './stores-page.component.html',
  styleUrls: ['./stores-page.component.css']
})
export class StoresPageComponent implements OnInit {

  public storeList: Observable<IStore[]> = this.storeService.stores$;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

}
