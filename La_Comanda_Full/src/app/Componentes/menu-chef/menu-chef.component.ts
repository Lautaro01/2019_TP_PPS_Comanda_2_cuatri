import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
@Component({
  selector: 'app-menu-chef',
  templateUrl: './menu-chef.component.html',
  styleUrls: ['./menu-chef.component.scss'],
})
export class MenuChefComponent implements OnInit {

  items = [
    {icono : 'list' , nombre : 'Pedidos' , ruta : 'pedidos-chef'},
   // {icono : 'bowtie' , nombre : 'Registrar empleado' , ruta  : ''}
  ];

  chefLogueado = {
    nombre : 'chef' ,
    apellido : 'chef' ,
    dni : '42554631' ,
    perfil : 'chef' ,
    correo : 'chef@chef.com' ,
    foto: '../../assets/usos/chef.jpg'
  };

  constructor(private loginservi: LoginService) { }

  ngOnInit() {}

  cerrarSesion() {
     this.loginservi.cerrarSesion();
   }

}
