import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearreservaComponent } from './crearreserva.component';

describe('CrearreservaComponent', () => {
  let component: CrearreservaComponent;
  let fixture: ComponentFixture<CrearreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearreservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
