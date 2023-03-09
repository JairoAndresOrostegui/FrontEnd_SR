import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesreservaComponent } from './informesreserva.component';

describe('InformesreservaComponent', () => {
  let component: InformesreservaComponent;
  let fixture: ComponentFixture<InformesreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesreservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
