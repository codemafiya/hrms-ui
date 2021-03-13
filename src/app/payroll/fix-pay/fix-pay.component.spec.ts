import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixPayComponent } from './fix-pay.component';

describe('FixPayComponent', () => {
  let component: FixPayComponent;
  let fixture: ComponentFixture<FixPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
