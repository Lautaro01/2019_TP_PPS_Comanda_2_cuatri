import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { config } from './firebase';
import { AngularFireAuth } from '@angular/fire/auth';


import { MenuMetreComponent } from './componentes/menu-metre/menu-metre.component';
import { ListaMetreComponent } from './componentes/lista-metre/lista-metre.component';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { MenuChefComponent } from './componentes/menu-chef/menu-chef.component';
import { PedidosChefComponent } from './componentes/pedidos-chef/pedidos-chef.component';
import { MenuBarmanComponent } from './componentes/menu-barman/menu-barman.component';
import { PedidosBarmanComponent } from './componentes/pedidos-barman/pedidos-barman.component';
import { RutasComponent } from './componentes/rutas/rutas.component';






@NgModule({
  declarations: [AppComponent, PedidosChefComponent, MenuMetreComponent, ListaMetreComponent,
                 NombreApellidoPipe, MenuChefComponent, MenuBarmanComponent, PedidosBarmanComponent, RutasComponent],
  entryComponents: [],
  imports: [BrowserModule, AngularFireModule.initializeApp(config), FormsModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    AngularFireAuth,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
