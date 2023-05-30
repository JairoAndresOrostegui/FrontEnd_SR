import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaGraficosAllsedesComponent } from './reserva-graficos-allsedes.component';

describe('ReservaGraficosAllsedesComponent', () => {
  let component: ReservaGraficosAllsedesComponent;
  let fixture: ComponentFixture<ReservaGraficosAllsedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaGraficosAllsedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaGraficosAllsedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
