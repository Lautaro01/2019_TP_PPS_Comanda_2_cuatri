import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Entidad } from '../modals/entidad';
import { AlertController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  entidadRef : AngularFirestoreCollection<Entidad>
  pedidoRef : AngularFirestoreCollection<any>;
  solicitaPago : AngularFirestoreCollection<any>;
  mesasRef : AngularFirestoreCollection<any>;
  clienteRef : AngularFirestoreCollection<any>;
  constructor(private bd : AngularFirestore , private auth : AngularFireAuth,private alertController : AlertController,private toastController : ToastController) {
    this.entidadRef = this.bd.collection("entidades");
    this.pedidoRef = this.bd.collection("pedidos", ref => ref.where('estadoPedido', '==' ,'pendiente'));
    this.solicitaPago = this.bd.collection("pedidos", ref => ref.where('estadoPedido', '==' ,'solicitaPago'));
    this.mesasRef = this.bd.collection("mesas");
   }

   traerEntidades(){
     return this.entidadRef;
   }
   actualizarClientes(entidad : Entidad){
     this.entidadRef.doc(entidad.id).update(entidad);
   }
   async cambiarEstado(estado : string,obj : Entidad) {
    let msj = "";
    let color = "";
    obj.estado = estado;
    if(estado == "rechazado"){
       msj = "Esta segruro de rechazar el ingreso de este cliente al restaurante?";
       color = "danger"
    }
    else if(estado == "aceptado"){
      msj = "Esta segruro de aceptar el ingreso de este cliente al restaurante?";
      color = "success";
    }
    
    const alert = await this.alertController.create({
      header: msj,
      buttons: [{
        text: 'Aceptar',
        cssClass: 'custom-alert-danger',
        handler: () => {
          console.log('Confirm acept');
          this.actualizarClientes(obj)
          this.presentToastWithOptions(estado,color,obj);
        }
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Confirm cancel');
        }
      }]
    });

    await alert.present();
   }
   async presentToastWithOptions(estado : string,color : string,obj:Entidad) {
    let msj : string = "";
    if(estado == "aceptado"){
      msj = "Cliente aceptado :) .Se le ha enviado un correo indicando lo sucedido";
      this.enviarMensaje(obj.correo);
    }
    else if(estado == "rechazado"){
      msj = "Cliente rechazado :( .Se le ha enviado un correo indicando lo sucedido";
      this.enviarMensaje(obj.correo);
    }
    const toast = await this.toastController.create({
      message: msj,
      duration : 3000,
      color : color
    });
    toast.present();
   }
   enviarMensaje(emailRemitente:string){
    setTimeout(()=>{
      this.auth.auth.sendPasswordResetEmail(emailRemitente);
    },3000);
   }
   actualizarPedido(obj : any){
     console.log(obj)
     this.pedidoRef.doc(obj.id).update(obj);
   }
   desvincularMesa(numeroMesa : string){
     console.log(numeroMesa);
      this.clienteRef = this.bd.collection("entidades" , ref => ref.where("mesa" , "==" , numeroMesa));
      return this.clienteRef;
   }

  
}
