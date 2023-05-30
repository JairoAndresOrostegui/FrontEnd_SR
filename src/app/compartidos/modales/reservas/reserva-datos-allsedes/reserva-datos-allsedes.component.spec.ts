import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaDatosAllsedesComponent } from './reserva-datos-allsedes.component';

describe('ReservaDatosAllsedesComponent', () => {
  let component: ReservaDatosAllsedesComponent;
  let fixture: ComponentFixture<ReservaDatosAllsedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaDatosAllsedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaDatosAllsedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
