import { Injectable } from '@angular/core';
import {  AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../modals/pedido';
import { Entidad } from '../modals/entidad';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosClienteService {

  colecionMesa : AngularFirestoreCollection<Pedido>
  colecionCliente : AngularFirestoreCollection<Entidad>

  constructor(private angularFirestore: AngularFirestore,private login : LoginService)
  {
    this.colecionMesa = this.angularFirestore.collection<Pedido>("pedidos");
    this.colecionCliente = this.angularFirestore.collection<Entidad>("entidades");
  }

    agregarPedido(pedido : Pedido){
      let promesa = this.login.traerDatosUsuario().subscribe(
        datos =>{
          console.log("Entre al alta de pedido");
          pedido.mesa = datos[0].mesa;
          pedido.id = this.angularFirestore.createId();
          this.colecionMesa.doc(pedido.id).set(pedido);
          this.colecionCliente.doc(datos[0].id).update(
            {
             pedido : "si"
            }
            )
            promesa.unsubscribe();
        }
      )
    }

    datosUsuario()
    {
      return this.login.traerDatosUsuario();
    }
}
