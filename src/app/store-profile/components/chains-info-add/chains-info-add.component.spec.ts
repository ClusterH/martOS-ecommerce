import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainsInfoAddComponent } from './chains-info-add.component';

describe('ChainsInfoAddComponent', () => {
  let component: ChainsInfoAddComponent;
  let fixture: ComponentFixture<ChainsInfoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainsInfoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainsInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
