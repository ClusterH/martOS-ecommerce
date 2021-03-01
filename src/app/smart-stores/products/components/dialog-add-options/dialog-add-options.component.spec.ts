import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddOptionsComponent } from './dialog-add-options.component';

describe('DialogAddOptionsComponent', () => {
  let component: DialogAddOptionsComponent;
  let fixture: ComponentFixture<DialogAddOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
