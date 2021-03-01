import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditVariantComponent } from './dialog-edit-variant.component';

describe('DialogEditVariantComponent', () => {
  let component: DialogEditVariantComponent;
  let fixture: ComponentFixture<DialogEditVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
