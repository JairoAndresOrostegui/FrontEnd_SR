import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipounidadComponent } from './tipounidad.component';

describe('TipounidadComponent', () => {
  let component: TipounidadComponent;
  let fixture: ComponentFixture<TipounidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipounidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipounidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
