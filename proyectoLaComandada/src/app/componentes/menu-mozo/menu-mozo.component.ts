import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-menu-mozo',
  templateUrl: './menu-mozo.component.html',
  styleUrls: ['./menu-mozo.component.scss'],
})
export class MenuMozoComponent implements OnInit {

  items = [
    {icono : "clipboard" , nombre : "Pedidos" , ruta : "pedidos"},
    // {icono : "bowtie" , nombre : "Registrar empleado" , ruta  : ""}
  ]
  jefeLogueado = {nombre : "Pablo" , apellido : "Hidalgo" , path : "../../../assets/mozo.png" , perfil : "Mozo"}
  constructor(private statusBar : StatusBar) { }

  ngOnInit() {
    this.statusBar.styleBlackTranslucent();
    this.statusBar.backgroundColorByHexString("#ff0000");
  }

}
