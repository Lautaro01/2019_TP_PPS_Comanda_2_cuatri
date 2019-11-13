import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

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
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { config } from './firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from 'src/app/servicios/login.service';
import { MenuClienteComponent } from './componentes/menu-cliente/menu-cliente.component';



@NgModule({
  declarations: [AppComponent,
  LoginComponent,
  AltaClienteComponent,
  MenuClienteComponent,
],
  entryComponents: [],
  imports: [BrowserModule,FormsModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(config)],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    BarcodeScanner,
    AngularFirestore,
    AltaClienteService,
    AngularFireAuth,
    LoginService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
