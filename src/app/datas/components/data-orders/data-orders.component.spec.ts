import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOrdersComponent } from './data-orders.component';

describe('DataOrdersComponent', () => {
  let component: DataOrdersComponent;
  let fixture: ComponentFixture<DataOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
