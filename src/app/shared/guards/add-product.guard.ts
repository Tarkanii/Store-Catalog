import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AddProductGuard implements CanActivate {

  constructor(
    private storeService: StoreService,
    private dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const storesAmount = this.storeService.getAllStores().length;

    if (storesAmount > 0) return true;

    this.dialog.open(InfoDialogComponent, {
      data: {
        message: 'You should add store before adding product',
        button: 'Add store',
        navigateLink: '/stores/add-store'
      }
    })

    return false;
  }
}
