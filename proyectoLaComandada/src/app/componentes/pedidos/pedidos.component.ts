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
           if(prod.estado == "listo" && prod.derivar == true){
            if(prod.tipo == "comida"){
              this.msjC = "Comida lista";
            }
            else if(prod.tipo == "bebida"){
              this.msjB = "Bebida lista";
            }
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
  derivar(producto : any , item : any){
    console.log(producto);
    if(producto.tipo == "comida"){
      this.msjC = "Comida en proceso";
    }
    else if(producto.tipo == "bebida"){
      this.msjB = "Bebida en proceso";
    }
    producto.derivar = true;
    this.comandaService.actualizarPedido(item);
  }
  pedidoListo(item : any){
    item['estadoPedido'] = 'listo';
    this.comandaService.actualizarPedido(item);
  }

}
