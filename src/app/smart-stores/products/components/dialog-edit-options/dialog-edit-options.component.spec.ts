import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditOptionsComponent } from './dialog-edit-options.component';

describe('DialogEditOptionsComponent', () => {
  let component: DialogEditOptionsComponent;
  let fixture: ComponentFixture<DialogEditOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
