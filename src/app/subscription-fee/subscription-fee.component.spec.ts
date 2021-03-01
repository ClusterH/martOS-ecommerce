import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFeeComponent } from './subscription-fee.component';

describe('SubscriptionFeeComponent', () => {
  let component: SubscriptionFeeComponent;
  let fixture: ComponentFixture<SubscriptionFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
