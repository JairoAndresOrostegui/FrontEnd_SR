import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasunidadComponent } from './caracteristicasunidad.component';

describe('CaracteristicasunidadComponent', () => {
  let component: CaracteristicasunidadComponent;
  let fixture: ComponentFixture<CaracteristicasunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaracteristicasunidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaracteristicasunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
