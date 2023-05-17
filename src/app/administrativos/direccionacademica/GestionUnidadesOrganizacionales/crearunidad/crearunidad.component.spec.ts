import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearunidadComponent } from './crearunidad.component';

describe('CrearunidadComponent', () => {
  let component: CrearunidadComponent;
  let fixture: ComponentFixture<CrearunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearunidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
