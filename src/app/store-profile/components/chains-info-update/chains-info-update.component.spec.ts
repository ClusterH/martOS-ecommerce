import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainsInfoUpdateComponent } from './chains-info-update.component';

describe('ChainsInfoUpdateComponent', () => {
  let component: ChainsInfoUpdateComponent;
  let fixture: ComponentFixture<ChainsInfoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainsInfoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainsInfoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
