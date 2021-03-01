import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadContractComponent } from './dialog-upload-contract.component';

describe('DialogUploadContractComponent', () => {
  let component: DialogUploadContractComponent;
  let fixture: ComponentFixture<DialogUploadContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploadContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
