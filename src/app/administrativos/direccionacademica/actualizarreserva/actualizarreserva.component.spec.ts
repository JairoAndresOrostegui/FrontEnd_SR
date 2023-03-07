import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarreservaComponent } from './actualizarreserva.component';

describe('ActualizarreservaComponent', () => {
  let component: ActualizarreservaComponent;
  let fixture: ComponentFixture<ActualizarreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarreservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
