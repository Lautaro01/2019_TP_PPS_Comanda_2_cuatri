import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  splash : boolean;

  constructor(private loginServi : LoginService,
    private toastController: ToastController,
    private router : Router,
    public loadingController: LoadingController) { 
      this.splash = true;
     setTimeout(() => {
       this.splash = false;
     }, 2000);
    }


  correo : string ="";
  clave : string ="";
  select : string;
  spinner : boolean;
  ionViewWillEnter()
  { 
    this.correo = "";
    this.clave = "";
  }

  async present() {
    return await this.loadingController.create({
      spinner: "bubbles",
      message: 'Iniciando sesion...',
      translucent: true,
      cssClass: "spinner",
    }).then(a => {
      a.present().then(
        () =>{ 
          if(!this.spinner)
          {
          this.loadingController.dismiss();
          }
        }
      );
    });
  }

  async dismiss() {
    this.spinner = false;
    //return await this.loadingController.dismiss();
  }


  async iniciarSecion()
  {
    if(this.correo == "" || this.clave == "")
    {
      this.mensaje("<h2>Error!</h2><h4>Por favor, complete todos los campos antes de iniciar sesion</h4>");
    }
    else{
      this.present();
      let respuesta = await this.loginServi.ingresar(this.correo,this.clave);
      switch (respuesta) {
        case "The email address is badly formatted.":
          await this.dismiss().then(
            () => this.mensaje("Error! El correo electronico tiene un formato incorrecto.")
          );
          break;
        case "The password is invalid or the user does not have a password.":
            this.dismiss();
            this.mensaje("Error! La contraseña es incorrecta");
          break;
        case "There is no user record corresponding to this identifier. The user may have been deleted.":
            this.dismiss();
            this.mensaje("Error! la cuenta con la que intenta ingresar no existe");
            break;
        default:
          let promesa = this.loginServi.traerDatosUsuario().subscribe(
            respuesta =>{
              try {
              switch (respuesta['0']['perfil'])
              {
                case 'cliente':
                  switch (respuesta['0']['estado'])
                  {
                  case 'pendiente':
                    this.dismiss();
                    this.mensaje("<h4>Su cuenta aun sigue en estado pendiente, intente ingresar nuevamente en la brevedad.</h4>");
                    promesa.unsubscribe();
                    break;
                  case 'aceptado':
                    this.dismiss();
                    this.router.navigate(["/menu-cliente"]);
                    promesa.unsubscribe();
                    break;
                  }
                  break;
                case 'jefe':
                    this.dismiss();
                    console.log("entre como jefe");
                    this.router.navigate(["/menu-jefe/lista"]);
                    promesa.unsubscribe();
                  break;
                case 'anonimo':
                    this.router.navigate(["/menu-cliente"]);
                    promesa.unsubscribe();
                  break;
                case 'empleado':
                    this.router.navigate(["/menu-empleado"]);
                    promesa.unsubscribe();
                  break;
                case 'mozo':
                   this.router.navigate(["/menu-mozo/pedidos"]);
                   promesa.unsubscribe();;
                   break;
                case 'barman':
                      this.router.navigate(["/menu-barman/pedidos-barman"]);
                      promesa.unsubscribe();
                      break;
                  case 'metre':
                   this.router.navigate(["/menu-metre/lista-metre"]);
                   promesa.unsubscribe();
                   break;
                   case 'chef':
                   this.router.navigate(["/menu-chef/pedidos-chef"]);
                   promesa.unsubscribe();
                   break;
               }
                
              } catch (error) {
                this.mensaje("Su cuenta a sido eliminada.");
              }
            }
          )
          break;
      }
    }

  }

  async mensaje(texto)
  {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2500,
      position:"top",
      color : "light",
      buttons: [{
          text: 'x',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    toast.present();
  }

  llenarInput(){
    switch (this.select) {
      case "jefe":
        this.correo = "jefe@jefe.com";
        this.clave = "jefe123"
        break;
      case "mozo":
        this.correo = "mozo@mozo.com";
        this.clave = "mozo123"
        break;
      case "barman":
        this.correo = "barman@barman.com";
        this.clave = "barman123"
        break;
      case "chef":
        this.correo = "chef@chef.com";
        this.clave = "chef123"
        break;
      case "anonimo":
        this.correo = "anonimo@anonimo.com";
        this.clave = "444444"
        break;
      case "metre":
        this.correo = "metre@metre.com";
        this.clave = "metre123"
        break;
      default:
        break;
    }
  }

  ngOnInit() {}
}
