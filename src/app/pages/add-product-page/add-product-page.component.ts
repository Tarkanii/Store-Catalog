import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { IStore } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent implements OnInit {

  private addingProductForm: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.addingProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: '',
      store: ['', Validators.required]
    })
  }

  public get storeList(): IStore[] {
    return this.storeService.getAllStores();
  }

  public formControl(control: string): AbstractControl | null {
    return this.addingProductForm?.get(control) || null;
  }

  public get form(): FormGroup {
    return this.addingProductForm as FormGroup;
  }

  public submit(event: Event): void {
    event.preventDefault();
    this.addingProductForm?.markAllAsTouched();
    this.addingProductForm?.updateValueAndValidity();
    if (!this.addingProductForm?.valid) return;
    const { name, price, store, description } = this.addingProductForm.value;
    this.productService.addProduct(name, price, store, description);
    this.dialog.open(InfoDialogComponent, {
      data: {
        message: 'Product was successfully added',
        navigateLink: '/products'
      }
    });
  }

}
