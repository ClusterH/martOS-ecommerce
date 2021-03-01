import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSalesComponent } from './data-sales.component';

describe('DataSalesComponent', () => {
  let component: DataSalesComponent;
  let fixture: ComponentFixture<DataSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
