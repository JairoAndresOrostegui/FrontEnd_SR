import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperaraccesoComponent } from './recuperaracceso.component';

describe('RecuperaraccesoComponent', () => {
  let component: RecuperaraccesoComponent;
  let fixture: ComponentFixture<RecuperaraccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperaraccesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperaraccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
