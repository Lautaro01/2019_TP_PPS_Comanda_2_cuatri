import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// servicio
import { PedidosChefService } from '../../servicios/pedidos-chef.service';
import { Pedido, Producto } from '../../modals/pedido';

import {  ToastController } from '@ionic/angular';


@Component({
  selector: 'app-pedidos-chef',
  templateUrl: './pedidos-chef.component.html',
  styleUrls: ['./pedidos-chef.component.scss'],
})
export class PedidosChefComponent implements OnInit {

 // pedidos: Pedido[] = [];
  pedidos = [];
  pedidosFiltro = [];

  observablePedidos: Observable<any[]>;
  mostrar = true;
  loading = true;

  estadoPedido = 'Pedido en Proceso';



  constructor(private pedidosSer: PedidosChefService, private toastController: ToastController) { }

  ngOnInit() {}

  ionViewWillEnter() {

    // traigo los pedidos como un observable  y queda escuchando si se producen cambios

    this.observablePedidos = this.pedidosSer.pedidosCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() ;
        data.id = a.payload.doc.id;
        return data;

      });
    }));

    this.observablePedidos.subscribe( data => {

      // data.forEach( element => {

      //   let productos: Producto[] = [];

      //   let pedido = element;

      //   element.productos.forEach( prod => {
      //     if (prod.tipo === 'comida' && prod.estado === 'enviado'  ) {
      //       productos.push(prod);
      //     }
      //   });

      //   if (productos.length > 0) {
      //    // console.log(element);
      //     pedido.estadoPedido = element.estadoPedido;
      //     pedido.id = element.id;
      //     pedido.mesa = element.mesa;
      //     pedido.productos = productos;
      //     pedido.total = element.total;
      //     this.pedidosFiltro.push(pedido);
      //   }

      // });


      this.pedidos = data;

      console.log(this.pedidos);

     // this.pedidos = data;
    });

    setTimeout(() => {
      this.loading = false;
    }, 2000);

  }

  pedidoListo(pedido: any) {

    if (pedido.estadoChef === 'pendiente' ) {

      pedido.estadoChef = 'enProceso';

      pedido.productos.forEach( element => {

        if (element.tipo === 'comida') {
          element.estado = 'enProceso';
        }
      });

    } else {

      pedido.estadoChef = 'listo';

      pedido.productos.forEach( element => {

        if (element.tipo === 'comida') {
          element.estado = 'listo';
        }
      });
      this.presentToast('Pedido realizado con exito!', 'success');

    }


    this.pedidosSer.actualizarPedido(pedido);


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

}
