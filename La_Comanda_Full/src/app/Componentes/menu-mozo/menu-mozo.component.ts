import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-menu-mozo',
  templateUrl: './menu-mozo.component.html',
  styleUrls: ['./menu-mozo.component.scss'],
})
export class MenuMozoComponent implements OnInit {

  items = [
    {icono : "clipboard" , nombre : "Pedidos" , ruta : "/menu-mozo/pedidos"},
    {icono : "card" , nombre : "Solicitudes de pago" , ruta  : "/menu-mozo/solicitud-pago"}
  ]
  jefeLogueado = {nombre : "Pablo" , apellido : "Hidalgo" , path : "../../../assets/mozo.png" , perfil : "Mozo"}
  constructor(private statusBar : StatusBar, private login : LoginService) { }

  ngOnInit() {
    this.statusBar.styleBlackTranslucent();
    this.statusBar.backgroundColorByHexString("#ff0000");
  }
  Cerrar(){
     this.login.cerrarSesion();
  }

}
