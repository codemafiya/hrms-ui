import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDtlComponent } from './personal.component';

describe('BankDtlComponent', () => {
  let component: BankDtlComponent;
  let fixture: ComponentFixture<BankDtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankDtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
