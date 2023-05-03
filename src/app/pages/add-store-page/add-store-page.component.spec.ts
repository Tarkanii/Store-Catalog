import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStorePageComponent } from './add-store-page.component';

describe('AddStorePageComponent', () => {
  let component: AddStorePageComponent;
  let fixture: ComponentFixture<AddStorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStorePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
