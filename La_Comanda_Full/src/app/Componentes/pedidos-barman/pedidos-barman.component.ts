import { Component, OnInit } from '@angular/core';
import { PedidosBarmanService } from 'src/app/servicios/pedidos-barman.service';
import { Observable } from 'rxjs';
import {  ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-pedidos-barman',
  templateUrl: './pedidos-barman.component.html',
  styleUrls: ['./pedidos-barman.component.scss'],
})
export class PedidosBarmanComponent implements OnInit {

  pedidos = [];
  observablePedidos: Observable<any[]>;
  mostrar = true;


  loading = true;

  constructor(private pedidosBar: PedidosBarmanService, private toastController: ToastController) {

  }

  ngOnInit() {}

  ionViewWillEnter() {

    // traigo los pedidos como un observable  y queda escuchando si se producen cambios

    this.observablePedidos = this.pedidosBar.pedidosCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() ;
        data.id = a.payload.doc.id;
        return data;

      });
    }));

    this.observablePedidos.subscribe( data => {

      // data.forEach( element => {

      //   let productos: Producto[] = [];

      //   let pedido = element

      //   element.productos.forEach( prod => {
      //     if (prod.tipo === 'comida' && prod.estado === 'pendiente' && prod.derivar === true ) {
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
      //     this.pedidos.push(pedido);
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

    if (pedido.estadoBarman === 'pendiente' ) {

      pedido.estadoBarman = 'enProceso';

      pedido.productos.forEach( element => {

        if (element.tipo === 'bebida') {
          element.estado = 'enProceso';
        }
      });

    } else {

      pedido.estadoBarman = 'listo';

      pedido.productos.forEach( element => {

        if (element.tipo === 'bebida') {
          element.estado = 'listo';
        }
      });
      this.presentToast('Pedido realizado con exito!', 'success');

    }


    this.pedidosBar.actualizarPedidoBarman(pedido);


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
