import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DedReportComponent } from './ded-report.component';

describe('DedReportComponent', () => {
  let component: DedReportComponent;
  let fixture: ComponentFixture<DedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
