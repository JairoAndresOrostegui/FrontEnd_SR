import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalgraficotortaComponent } from './modalgraficotorta.component';

describe('ModalgraficotortaComponent', () => {
  let component: ModalgraficotortaComponent;
  let fixture: ComponentFixture<ModalgraficotortaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalgraficotortaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalgraficotortaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
