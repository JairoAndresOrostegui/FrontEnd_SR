import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceraComponent } from './piecera.component';

describe('PieceraComponent', () => {
  let component: PieceraComponent;
  let fixture: ComponentFixture<PieceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
