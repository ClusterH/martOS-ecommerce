/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StoreEditAddressComponent } from './store-edit-address.component';

describe('StoreEditAddressComponent', () => {
  let component: StoreEditAddressComponent;
  let fixture: ComponentFixture<StoreEditAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEditAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
