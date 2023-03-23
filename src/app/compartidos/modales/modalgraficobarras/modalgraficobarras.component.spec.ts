import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalgraficobarrasComponent } from './modalgraficobarras.component';

describe('ModalgraficobarrasComponent', () => {
  let component: ModalgraficobarrasComponent;
  let fixture: ComponentFixture<ModalgraficobarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalgraficobarrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalgraficobarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
