import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDtlComponent } from './basic-dtl.component';

describe('BasicDtlComponent', () => {
  let component: BasicDtlComponent;
  let fixture: ComponentFixture<BasicDtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
