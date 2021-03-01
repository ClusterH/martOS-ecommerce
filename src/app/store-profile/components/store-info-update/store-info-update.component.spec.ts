import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInfoUpdateComponent } from './store-info-update.component';

describe('StoreInfoUpdateComponent', () => {
  let component: StoreInfoUpdateComponent;
  let fixture: ComponentFixture<StoreInfoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreInfoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInfoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
