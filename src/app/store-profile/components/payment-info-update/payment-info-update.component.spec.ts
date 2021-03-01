import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInfoUpdateComponent } from './payment-info-update.component';

describe('PaymentInfoUpdateComponent', () => {
  let component: PaymentInfoUpdateComponent;
  let fixture: ComponentFixture<PaymentInfoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInfoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInfoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
