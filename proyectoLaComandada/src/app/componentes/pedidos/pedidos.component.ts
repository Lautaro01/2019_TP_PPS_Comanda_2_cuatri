import { Component, OnInit } from '@angular/core';
import { ComandaService } from 'src/app/servicios/comanda.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  pedidos = [];
  observablePedidos : Observable<any[]>;
  mostrar : boolean = true;
  mesa : string ;
  mostrarPed : boolean = false;
  loading : boolean = true;
  constructor(private comandaService : ComandaService , private toast : ToastController) { }

  ngOnInit() {
    this.observablePedidos= this.comandaService.pedidoRef.snapshotChanges().pipe(map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data()
        if(!data.mostrar){
          data.mostrar = false;
        }
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    this.observablePedidos.subscribe(data =>{
      
      data.forEach(element =>{
        let contador = 0
        element.productos.forEach(prod =>{
           if(prod.estado == "listo"){
             contador ++ ;
           }
        })
        if(contador == element.productos.length){
          element.estadoPedido = "listo";
        }
      })
      this.pedidos = data;
      console.log(this.pedidos.length);
      if(this.pedidos.length == 0){
        this.mostrar = false;
      }
    })
    setTimeout(()=>{
      this.loading = false;
    },3000);
  }
  derivar(item : any){
    console.log(item);
    item.productos.forEach(producto=>{
      if(producto.tipo == "comida"){
        producto.estado = "enviado";
        item.estadoChef = "pendiente";
      }
      else if(producto.tipo == "bebida"){
        producto.estado = "enviado";
        item.estadoBarman = "pendiente";
      }
    })
    this.comandaService.actualizarPedido(item);
  }
  pedidoListo(item : any){
    this.comandaService.actualizarPedido(item);
    this.presentToast();
  }
  mostrarP(item : any){
    item.estadoPedido = "pendiente";
    if(item.mostrar){
      item.mostrar = false;
    }
    else{
      item.mostrar = true;
    }
    this.comandaService.actualizarPedido(item);
    
    
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Pedido listo, a la espera de la confirmación del cliente',
      duration: 2000,
      color : "success"
    });
    toast.present();
  }

}
