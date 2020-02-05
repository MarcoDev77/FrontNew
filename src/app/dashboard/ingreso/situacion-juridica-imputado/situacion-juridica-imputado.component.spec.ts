import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionJuridicaImputadoComponent } from './situacion-juridica-imputado.component';

describe('SituacionJuridicaImputadoComponent', () => {
  let component: SituacionJuridicaImputadoComponent;
  let fixture: ComponentFixture<SituacionJuridicaImputadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituacionJuridicaImputadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacionJuridicaImputadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
