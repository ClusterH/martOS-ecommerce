/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TempSignOutComponent } from './temp-sign-out.component';

describe('TempSignOutComponent', () => {
  let component: TempSignOutComponent;
  let fixture: ComponentFixture<TempSignOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempSignOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempSignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
