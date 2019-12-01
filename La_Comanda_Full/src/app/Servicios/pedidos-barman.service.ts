import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PedidosBarmanService {

  pedidosCol: AngularFirestoreCollection<any>;

  constructor(private bd: AngularFirestore , private auth: AngularFireAuth,
              private alertController: AlertController, private toastController: ToastController) { 
      this.pedidosCol = this.bd.collection('pedidos', ref => ref.where('estadoPedido', '==' , 'pendiente'));
    }

    
  actualizarPedidoBarman(pedido: any) {
    this.pedidosCol.doc(pedido.id).update(pedido);
  }
}
