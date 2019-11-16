import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import { HttpClient } from '@angular/common/http';
import {AngularFireMessaging} from '@angular/fire/messaging';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Mesa } from '../modals/mesa';
import { SolicitudMesa } from '../modals/solicitudmesa';


@Injectable({
  providedIn: 'root'
})
export class ListaMetreService {

  coleccionSolicitudes: AngularFirestoreCollection<SolicitudMesa>;
  coleccionMesas: AngularFirestoreCollection<Mesa>;


  constructor(private angularFirestore: AngularFirestore , private auth: AngularFireAuth) {
    this.coleccionSolicitudes = this.angularFirestore.collection('solicitudes-metre');
    this.coleccionMesas = this.angularFirestore.collection('mesas');
   }

   /**
    * Traigo las solicitudes de clientes para tener mesa
    */
   traerSolicitudes() {
     return this.coleccionSolicitudes;
   }

   /**
    * Traigo las mesas
    */
   traerMesas() {
    return this.coleccionMesas;
   }

   /**
    * Actualizo una mesa pasandole por parametro el objeto modificado
    * @param mesa mesa que quiero actualizar
    */
    actualizarMesas(mesa) {
      this.coleccionMesas.doc(mesa.id).update(mesa);
   }

   /**
    * Permite actualizar el estado de una solicitud
    * @param estado estado que va a tener es solicitud al actualizarse (rechazada | aceptada)
    * @param soli solicitud a actualizar
    */
    cambiarEstadoSolicitud(estado: string , soli: SolicitudMesa) {
     soli.estado = estado;
     this.actualizarSolicitud(soli);
   }

   borrarSolicitud(solicitud: SolicitudMesa) {
    this.coleccionSolicitudes.doc(solicitud.id).delete();
   }

   actualizarSolicitud(solicitud: SolicitudMesa) {
    this.coleccionSolicitudes.doc(solicitud.id).update(solicitud);
   }
  }

