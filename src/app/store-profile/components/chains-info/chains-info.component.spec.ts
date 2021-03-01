import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainsInfoComponent } from './chains-info.component';

describe('ChainsInfoComponent', () => {
  let component: ChainsInfoComponent;
  let fixture: ComponentFixture<ChainsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
