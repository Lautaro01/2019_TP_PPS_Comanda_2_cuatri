import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
@Component({
  selector: 'app-menu-barman',
  templateUrl: './menu-barman.component.html',
  styleUrls: ['./menu-barman.component.scss'],
})
export class MenuBarmanComponent implements OnInit {

  items = [
    {icono : 'list' , nombre : 'Pedidos' , ruta : 'pedidos-barman'},
   // {icono : 'bowtie' , nombre : 'Registrar empleado' , ruta  : ''}
  ];

  barmanLogueado = {
    nombre : 'barman' ,
    apellido : 'barman' ,
    dni : '42554631' ,
    perfil : 'barman' ,
    correo : 'barman@barman.com' ,
    foto: '../../assets/usos/bartender.png'
  };

  constructor(private loginservi: LoginService) { }

  ngOnInit() {}
  cerrarSesion() {
     this.loginservi.cerrarSesion();
   }

}
