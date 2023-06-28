import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IStore } from 'src/app/shared/interfaces/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() public format: string = 'full';
  @Input() public type!: string;
  @Input() public store!: IStore;
  @Input() public product!: IProduct;

  constructor(
    private productService: ProductService,
    private storeService: StoreService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  private getCallback(id: string): any {
    return () => {
      if (this.type === 'store') {
        this.storeService.removeStore(id);
        return;
      }

      this.productService.removeProduct(id);
    }
  } 

  private getMessage(): string {
    if (this.type === 'store') {
      return 'Do you want to remove this store?<br>Products connected to this store will also be removed';
    }

    return 'Do you want to remove this product?';
  }

  public remove(event: Event, id: string = ''): void {
    event.stopPropagation();
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: this.getMessage(),
        callback: this.getCallback(id)
      }
    })
    
  }
}
