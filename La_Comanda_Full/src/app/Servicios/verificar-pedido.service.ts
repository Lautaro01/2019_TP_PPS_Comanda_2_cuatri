import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../modals/pedido';
import { Entidad } from '../modals/entidad';

@Injectable({
  providedIn: 'root'
})
export class VerificarPedidoService {

  colecion: AngularFirestoreCollection<Pedido>
  coleccionCliente : AngularFirestoreCollection<Entidad>

  constructor(private angularFirestore: AngularFirestore) { 
    this.colecion = this.angularFirestore.collection<Pedido>("pedidos");
    this.coleccionCliente = this.angularFirestore.collection<Entidad>("entidades");
  }
  

  traerPedidoPorMesa(numero : string)
  {
    return this.angularFirestore.collection<Pedido>("pedidos",ref=>ref.where("mesa","==",numero)).valueChanges();
  }

   traerDatosUsuario()
    {
        return this.angularFirestore.collection<Entidad>("entidades", ref => ref.where("correo","==",this.correoUsuarioActual())).valueChanges();
    }

    correoUsuarioActual()
    {
        let correo = localStorage.getItem('correo');
        return correo;
    }

    cambiarEstadoAresivido()
    {
      console.log("aaaaaaaaaaaaaaaaaaaa");
      let promesa = this.traerDatosUsuario().subscribe(
        usuario =>
        {
          this.coleccionCliente.doc(usuario[0].id).update(
            {
              pedido : "recibido"
            }
          )
          if(usuario[0].pedido == "recibido")
          {
            promesa.unsubscribe();
          }
        }
      )
    }

    confirmarPedido()
    {
      let promesa = this.traerDatosUsuario().subscribe(
        usuario=>
        {
          console.log("hola");
          this.coleccionCliente.doc(usuario['0'].id).update(
            {
              pedido : "verificado"
            })
            if(usuario[0].pedido == "verificado")
            {
              promesa.unsubscribe()
            }
        }
      )
    }

}
