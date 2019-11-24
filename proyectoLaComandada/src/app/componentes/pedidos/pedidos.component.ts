import { Component, OnInit } from '@angular/core';
import { ComandaService } from 'src/app/servicios/comanda.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  pedidos = [];
  observablePedidos : Observable<any[]>;
  mostrar : boolean = true;
  msjC : string = "Derivar al chef";
  msjB : string = "Derivar al barman";
  constructor(private comandaService : ComandaService) { }

  ngOnInit() {
    this.observablePedidos= this.comandaService.pedidoRef.snapshotChanges().pipe(map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data() 
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
    })
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
  }

}
