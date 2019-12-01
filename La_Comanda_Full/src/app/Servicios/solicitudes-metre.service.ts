import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import { HttpClient } from '@angular/common/http';
import {AngularFireMessaging} from '@angular/fire/messaging';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Mesa } from '../modals/mesa';
import { SolicitudMesa } from '../modals/solicitudmesa';
import { Entidad } from '../modals/entidad';


@Injectable({
  providedIn: 'root'
})
export class ListaMetreService {

  coleccionEntidades: AngularFirestoreCollection<Entidad>;
 // coleccionMesas: AngularFirestoreCollection<Mesa>;


  constructor(private angularFirestore: AngularFirestore , private auth: AngularFireAuth) {
    this.coleccionEntidades = this.angularFirestore.collection('entidades');
   // this.coleccionMesas = this.angularFirestore.collection('mesas');
   }

   /**
    * Traigo las solicitudes de clientes para tener mesa
    */
   traerEntidades() {
     return this.coleccionEntidades;
   }

   /**
    * Traigo las mesas
    */
  //  traerMesas() {
  //   return this.coleccionMesas;
  //  }

   /**
    * Actualizo una mesa pasandole por parametro el objeto modificado
    * @param mesa mesa que quiero actualizar
    */
  //   actualizarEntidad(mesa) {
  //     this.coleccionMesas.doc(mesa.id).update(mesa);
  //  }

   /**
    * Permite actualizar el estado de una solicitud
    * @param estado estado que va a tener es solicitud al actualizarse (rechazada | aceptada)
    * @param soli solicitud a actualizar
    */
    cambiarEstadoEntidad(estado: string , entidad: Entidad) {
      entidad.estado = estado;
      this.actualizarEntidad(entidad);
   }

  //  borrarSolicitud(solicitud: SolicitudMesa) {
  //   this.coleccionSolicitudes.doc(solicitud.id).delete();
  //  }

   actualizarEntidad(entidad: Entidad) {
    this.coleccionEntidades.doc(entidad.id).update(entidad);
   }
  }

