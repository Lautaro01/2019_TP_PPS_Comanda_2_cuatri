import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule } from '@angular/forms';
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { AltaClienteService } from './servicios/alta-cliente.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { config } from './firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuClienteComponent } from './componentes/menu-cliente/menu-cliente.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { MenuJefeComponent } from './componentes/menu-jefe/menu-jefe.component'
import { ListaComponent } from './componentes/lista/lista.component';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { PedirMesaClienteComponent } from './componentes/pedir-mesa-cliente/pedir-mesa-cliente.component';
import { SplashComponent } from './componentes/splash/splash.component';
import { HacerPedidoClienteComponent } from './componentes/hacer-pedido-cliente/hacer-pedido-cliente.component';
import { PedidosClienteService } from './servicios/pedidos-cliente.service';
import { LoginService } from './servicios/login.service';
import { MesaClienteService } from './Servicios/mesa-cliente.service';
import { VerificarPedidoService } from './Servicios/verificar-pedido.service';
import {VerificarEstadoPedidoComponent} from './Componentes/verificar-estado-pedido/verificar-estado-pedido.component';
//Beta
import { MenuMozoComponent } from './Componentes/menu-mozo/menu-mozo.component';
import { PedidosComponent } from './Componentes/pedidos/pedidos.component';
import { ComandaService } from './servicios/comanda.service';
import { PedidosChefComponent } from './Componentes/pedidos-chef/pedidos-chef.component';
import { MenuMetreComponent } from './Componentes/menu-metre/menu-metre.component';
import { ListaMetreComponent } from './Componentes/lista-metre/lista-metre.component';
import { MenuChefComponent } from './Componentes/menu-chef/menu-chef.component';
import { MenuBarmanComponent } from './Componentes/menu-barman/menu-barman.component';
import { PedidosBarmanComponent } from './Componentes/pedidos-barman/pedidos-barman.component';
import { EstadoPedidoPipe } from './pipes/estado-pedido.pipe';
// import { PedidosBarmanService } from './servicios/pedidos-barman.service';
// import { PedidosChefService } from './servicios/pedidos-chef.service';
// import { ListaMetreService } from './servicios/solicitudes-metre.service';
import { PedirCuentaClienteComponent } from './Componentes/pedir-cuenta-cliente/pedir-cuenta-cliente.component';
import { EncuestaComponent } from './Componentes/encuesta/encuesta.component';
import { SolicitaPagoComponent } from './Componentes/solicita-pago/solicita-pago.component';
//gamma

@NgModule({
  declarations: [AppComponent,
  LoginComponent,
  AltaClienteComponent,
  MenuClienteComponent,
  MenuJefeComponent,
  ListaComponent,
  NombreApellidoPipe,
  SplashComponent,
  PedirMesaClienteComponent,
  HacerPedidoClienteComponent,
  VerificarEstadoPedidoComponent,
  MenuMozoComponent,
  PedidosComponent,
  PedidosChefComponent,
  MenuMetreComponent,
  ListaMetreComponent,
  MenuChefComponent,
  MenuBarmanComponent,
  PedidosBarmanComponent,
  EstadoPedidoPipe,
  PedirCuentaClienteComponent,
  EncuestaComponent,
  SolicitaPagoComponent
],
  entryComponents: [],
  imports: [BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    RouterModule,
    AngularFireAuthModule
],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    BarcodeScanner,
    AngularFirestore,
    AltaClienteService,
    AngularFireAuth,
    LoginService,
    MesaClienteService,
    PedidosClienteService,
    VerificarPedidoService,
    ComandaService,
    // PedidosBarmanService,
    // PedidosChefService,
    // ListaMetreService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
