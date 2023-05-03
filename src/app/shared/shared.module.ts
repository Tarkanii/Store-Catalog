import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from '../app-routing.module';
import { CardComponent } from "./components/card/card.component";
import { StoreIconComponent } from "./components/store-icon/store-icon.component";
import { ConfirmationDialogComponent } from "./dialogs/confirmation-dialog/confirmation-dialog.component";
import { InfoDialogComponent } from "./dialogs/info-dialog/info-dialog.component";
import { PricePipe } from './pipes/price.pipe';



@NgModule({
  declarations: [
    CardComponent,
    StoreIconComponent,
    ConfirmationDialogComponent,
    InfoDialogComponent,
    PricePipe
  ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  exports: [
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardComponent,
    StoreIconComponent,
    PricePipe
  ]
})
export class SharedModule { }