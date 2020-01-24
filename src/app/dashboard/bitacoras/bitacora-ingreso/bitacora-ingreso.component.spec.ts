import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraIngresoComponent } from './bitacora-ingreso.component';

describe('BitacoraIngresoComponent', () => {
  let component: BitacoraIngresoComponent;
  let fixture: ComponentFixture<BitacoraIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
