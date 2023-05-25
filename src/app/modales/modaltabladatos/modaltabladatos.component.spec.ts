import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltabladatosComponent } from './modaltabladatos.component';

describe('ModaltabladatosComponent', () => {
  let component: ModaltabladatosComponent;
  let fixture: ComponentFixture<ModaltabladatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaltabladatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaltabladatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
