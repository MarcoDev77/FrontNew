import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAnexosComponent } from './datos-anexos.component';

describe('DatosAnexosComponent', () => {
  let component: DatosAnexosComponent;
  let fixture: ComponentFixture<DatosAnexosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosAnexosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAnexosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
