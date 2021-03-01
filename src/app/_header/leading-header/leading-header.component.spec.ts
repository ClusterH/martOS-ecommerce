import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadingHeaderComponent } from './leading-header.component';

describe('LeadingHeaderComponent', () => {
  let component: LeadingHeaderComponent;
  let fixture: ComponentFixture<LeadingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
