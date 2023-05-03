import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/store.service';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-add-store-page',
  templateUrl: './add-store-page.component.html',
  styleUrls: ['./add-store-page.component.css']
})
export class AddStorePageComponent implements OnInit {

  private addingStoreForm: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private dialog: MatDialog
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
  }

  private initForm(): void {
    this.addingStoreForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      city: ['', Validators.required],
      street: ['', Validators.required],
      number: ''
    })
  }

  public get form(): FormGroup {
    return this.addingStoreForm as FormGroup;
  }

  public formControl(control: string): AbstractControl {
    return this.addingStoreForm?.get(control) as AbstractControl;
  }

  public submit(event: Event): void {
    event.preventDefault();
    this.addingStoreForm?.markAllAsTouched();
    this.addingStoreForm?.updateValueAndValidity();

    if (!this.addingStoreForm?.valid) return;
    
    const { name, description, city, street, number } = this.addingStoreForm?.value;
    const address = `${city}, ${street} ${number ?? ''}`;
    this.storeService.addStore(name.trim(), address.trim(), description.trim());
    this.dialog.open(InfoDialogComponent, {
      data: {
        message: 'Store was successfully added',
        navigateLink: '/stores'
      },
    });
  } 

}
