import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasComponent } from './rutas.component';

describe('RutasComponent', () => {
  let component: RutasComponent;
  let fixture: ComponentFixture<RutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutasComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
