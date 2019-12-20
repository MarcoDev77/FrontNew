import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DactiloscapiaComponent } from './dactiloscapia.component';

describe('DactiloscapiaComponent', () => {
  let component: DactiloscapiaComponent;
  let fixture: ComponentFixture<DactiloscapiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DactiloscapiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DactiloscapiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
