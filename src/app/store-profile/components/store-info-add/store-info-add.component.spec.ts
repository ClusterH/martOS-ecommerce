import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInfoAddComponent } from './store-info-add.component';

describe('StoreInfoAddComponent', () => {
  let component: StoreInfoAddComponent;
  let fixture: ComponentFixture<StoreInfoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreInfoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
