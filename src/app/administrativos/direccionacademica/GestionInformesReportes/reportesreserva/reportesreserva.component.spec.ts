import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesreservaComponent } from './reportesreserva.component';

describe('ReportesreservaComponent', () => {
  let component: ReportesreservaComponent;
  let fixture: ComponentFixture<ReportesreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesreservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
