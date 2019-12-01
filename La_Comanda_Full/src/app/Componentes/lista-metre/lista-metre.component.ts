import { Component, OnInit } from '@angular/core';
import { ListaMetreService } from '../../servicios/solicitudes-metre.service'; // importo servidor de la lista de solicitudes
import { AlertController, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Mesa } from '../../modals/mesa';
import { map } from 'rxjs/operators';
import { SolicitudMesa } from '../../modals/solicitudmesa';
import { Observable } from 'rxjs';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { async } from 'q';
import { Entidad } from '../../modals/entidad';

@Component({
  selector: 'app-lista-metre',
  templateUrl: './lista-metre.component.html',
  styleUrls: ['./lista-metre.component.scss'],
})
export class ListaMetreComponent implements OnInit {

  mesasObs: Observable<Mesa[]>;
  entidadesObs: Observable<Entidad[]>;

  mesas = [];
  entidades = [];

  mesaActualizada;

  mostrar = true;
  loading = true;
  radioBtnOpt = 'no';

  selectMesa;



  constructor(public listaService: ListaMetreService, private alertController: AlertController,
              private toastController: ToastController, private statusBar: StatusBar) { }

  ngOnInit() {
    console.log('entra');
  }

  ionViewWillEnter() {


    // traigo las solicitudes como un observable  y queda escuchando si se producen cambios
    this.entidadesObs = this.listaService.traerEntidades().snapshotChanges().pipe( map ( actions => {
      return actions.map( a => {
        const data1 = a.payload.doc.data() as Entidad;
        data1.id = a.payload.doc.id;
        return data1;
      });
    }));

    // traigo las mesas como un observable  y queda escuchando si se producen cambios
    // this.mesasObs = this.listaService.traerMesas().snapshotChanges().pipe( map ( actions => {
    //   return actions.map( a => {
    //     const data2 = a.payload.doc.data() as Mesa;
    //     data2.id = a.payload.doc.id;
    //     return data2;
    //   });
    // }));

    // cargo el array de solicitudes que voy a mostrar en el html
    this.entidadesObs.subscribe( data => {
      this.entidades = [];
      data.forEach( element => {
        if (element.mesa === 'pendiente') {
        this.entidades.push(element);
        }
      });

      if (this.entidades.length === 0) {
        this.mostrar = false;
      } else {
        this.mostrar = true;
      }
    });

    // cargo el array de las mesas que "no estan ocupadas" las cuales voy a mostrar con un alert 
    // this.mesasObs.subscribe( data => {
    //   this.mesas = [];
    //   data.forEach( element => {
    //     if (element.estado === 'desocupado') {
    //     this.mesas.push(element);
    //     }
    //   });
    // });

    setTimeout(() => {
      this.loading = false;
    }, 2000);

  }

  /**
   * Este metodo va a aceptar o rechazar la solicitud de un cliente para una mesa
   * si ACEPTA la solicitud ,se le cambia el estado a esa solicitud por "aceptada"
   * tambien a la mesa que el metre elijio se le va a cambiar el estado a "solicitado" y se le indica el correo del usuario al que pertenece
   * si se RECHAZA , solo se le cambia el estado a la solicitud como "rechazada"
   * @param soli solicitud seleccionada
   * @param estado rechazado o aceptado
   */
 async asignarMesa(ent: Entidad, estado) {


    if (estado === 'rechazado') {
      this.presentAlertConfirm(ent);

    } else {
     // const confirm = await this.presentAlertRadio();

    //  if (confirm) {

      ent.mesa = 'habilitado'; // cambio el estado de la solicitud para que quede guardado que se acepto la solicitud de la mesa

      this.listaService.actualizarEntidad(ent);
     // this.buscarMesa(this.radioBtnOpt, soli);
     // this.listaService.actualizarMesas(this.mesaActualizada);

      this.presentToast('Solicitud Aceptada!', 'success');
    //  }
    }
  }

/**
 * Este metodo lo que hace es obtener el objeto "MESA" dentro del array de mesas
 * comparando por el "numero de mesa" que se elije en el alert
 * 
 * @param numeroMesa el numero de mesa que elije el metre
 * @param soli solicitud que el metre selecciona
 */
  buscarMesa(numeroMesa, soli: SolicitudMesa) {
    this.mesas.forEach(element => {
      if (element.numero === numeroMesa) {
        this.mesaActualizada = element;
        this.mesaActualizada.usuarioActual = soli.correo;
        this.mesaActualizada.estado = 'solicitado';

      }
    });
  }



  /**
   * Este alert se presenta cuando se debe elejir un numero de MESA
   * Si se elije un numero e mesa y se le da a ACEPTAR se carga en una variable el numero de mesa elejido
   * Si se le da a cancelar , se cierra el alert
   * NOTA: este alert simula una forma sincronica y no asincronica para esperar la respuesta del usuario antes de continuar con otro codigo
   */
    async presentAlertRadio():Promise<boolean> {
      let resolveFunction: (confirm: boolean) => void;
      const promise = new Promise<boolean>(resolve => {
        resolveFunction = resolve;
      });

      const radio_options = [];

    // cargo cada radio button con una respectiva mesa
      for (let i = 0; i < this.mesas.length; i++) {
      radio_options.push({
        name: (this.mesas[i]).numero,
        type: 'radio',
        label: (this.mesas[i]).numero,
        value: (this.mesas[i]).numero,
      });
    }
      const alert = await this.alertController.create({
      header: 'Seleccione una Mesa: ',
      inputs : radio_options,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data => {
            console.log(data);
            console.log('Confirm Cancel');
            resolveFunction(false);
          }
        }, {
          text: 'Aceptar',
          handler: data => {
            if (data !== 'undefined') {
              this.radioBtnOpt = data;
            }
            resolveFunction(true);
           // console.log(data);
          //  console.log('Confirm Ok');
          }
        }
      ]
    });
      await alert.present();

      return promise;
  }





  async presentToast(msj , colores) {
    const toast = await this.toastController.create({
      // message: 'Your settings have been saved.',
      message: msj,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ocultar',
      color: colores
    });
    toast.present();
  }

  /**
   * Este alert se presenta cuando se va a confirmar si se desea rechazar completamente la solicitud del usuario
   * si se le da a ACEPTAR , se actualiza el estado de solicitud y pasa a "rechazado"
   * si se da a CANCELAR , simplemente se cierra la ventana
   * @param soli solicitud elejida por metre
   */
  async presentAlertConfirm(ent: Entidad) {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea rechazar la solicitud?',
     // message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            ent.mesa = 'rechazado';
            this.listaService.actualizarEntidad(ent);
            this.presentToast('Solicitud Rechazada!', 'success');
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
