import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarunidadComponent } from './consultarunidad.component';

describe('ConsultarunidadComponent', () => {
  let component: ConsultarunidadComponent;
  let fixture: ComponentFixture<ConsultarunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarunidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
