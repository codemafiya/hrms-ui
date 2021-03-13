import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablePayComponent } from './variable-pay.component';

describe('VariablePayComponent', () => {
  let component: VariablePayComponent;
  let fixture: ComponentFixture<VariablePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariablePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
