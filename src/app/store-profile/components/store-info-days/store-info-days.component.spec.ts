import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInfoDaysComponent } from './store-info-days.component';

describe('StoreInfoDaysComponent', () => {
  let component: StoreInfoDaysComponent;
  let fixture: ComponentFixture<StoreInfoDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreInfoDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInfoDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
