import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedirCuentaClienteComponent } from './pedir-cuenta-cliente.component';

describe('PedirCuentaClienteComponent', () => {
  let component: PedirCuentaClienteComponent;
  let fixture: ComponentFixture<PedirCuentaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirCuentaClienteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedirCuentaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
