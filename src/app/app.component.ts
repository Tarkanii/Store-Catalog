import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { InfoDialogComponent } from './shared/dialogs/info-dialog/info-dialog.component';
import { defaultProducts, defaultStores } from './shared/default-values';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'store-catalog';

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setDefaultValues();
    this.openDialog();
 
  }

  private setDefaultValues(): void {
    if (localStorage.getItem('storeList')) return;

    localStorage.setItem('storeList', JSON.stringify(defaultStores));
    localStorage.setItem('productList', JSON.stringify(defaultProducts));
  }

  private openDialog(): void {
    const dialogOpened = sessionStorage.getItem('dialogOpened');
    if (dialogOpened && JSON.parse(dialogOpened)) return;
    const dialog = this.dialog.open(InfoDialogComponent, {
      data: {
        message: 'This project made for fun.<br>Default stores and products added'
      }
    })

    dialog.afterOpened()
      .pipe(take(1)) 
      .subscribe(() => sessionStorage.setItem('dialogOpened', 'true'))
  }
}
