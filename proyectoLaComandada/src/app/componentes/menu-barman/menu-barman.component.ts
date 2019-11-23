import { Component, OnInit } from '@angular/core';

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
    foto: '../../assets/usos/user.png'
  };

  constructor() { }

  ngOnInit() {}
  cerrarSesion() {
    // this.loginservi.cerrarSesion();
   }

}
