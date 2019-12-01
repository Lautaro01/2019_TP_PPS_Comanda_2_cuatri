import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
@Component({
  selector: 'app-menu-metre',
  templateUrl: './menu-metre.component.html',
  styleUrls: ['./menu-metre.component.scss'],
})
export class MenuMetreComponent implements OnInit {

  items = [
    {icono : 'list' , nombre : 'Solicitudes Mesa' , ruta : 'lista-metre'},
   // {icono : 'bowtie' , nombre : 'Registrar empleado' , ruta  : ''}
  ];

  metreLogeado = {
    nombre : 'metre' ,
    apellido : 'metre' ,
    dni : '42554631' ,
    perfil : 'metre' ,
    correo : 'metre@metre.com' ,
    foto: '../../assets/usos/maitre2.png'
  };

  constructor(private loginservi: LoginService) {
  //  this.inicio();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    console.log('asdasd');
    // this.inicio();
  }

  async inicio() {
    // this.loginservi.traerDatosUsuario().subscribe(
    //   datos => {
    //     this.clienteLogeado.nombre = datos['0']['nombre'];
    //     this.clienteLogeado.apellido = datos['0']['apellido'];
    //     this.clienteLogeado.foto = datos['0']['foto'];
    //     this.clienteLogeado.perfil = datos['0']['perfil'];
    //     console.log(this.clienteLogeado);
    //   }
    // );
  }

  cerrarSesion() {
    this.loginservi.cerrarSesion();
  }

}
