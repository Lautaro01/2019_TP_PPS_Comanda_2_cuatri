import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PedidosChefService {

  pedidosCol: AngularFirestoreCollection<any>;

  constructor(private bd: AngularFirestore , private auth: AngularFireAuth,
              private alertController: AlertController, private toastController: ToastController) { 
                this.pedidosCol = this.bd.collection('pedidos', ref => ref.where('estadoPedido', '==' , 'pendiente').where('estadoChef','==','pendiente'));
              }

  actualizarPedido(pedido: any) {
    this.pedidosCol.doc(pedido.id).update(pedido);
  }


}

