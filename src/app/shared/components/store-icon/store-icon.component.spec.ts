import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreIconComponent } from './store-icon.component';

describe('StoreIconComponent', () => {
  let component: StoreIconComponent;
  let fixture: ComponentFixture<StoreIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
