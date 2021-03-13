import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryBillComponent } from './salary-bill.component';

describe('SalaryBillComponent', () => {
  let component: SalaryBillComponent;
  let fixture: ComponentFixture<SalaryBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
