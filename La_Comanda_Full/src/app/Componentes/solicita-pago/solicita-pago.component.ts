import { Component, OnInit } from '@angular/core';
import { ComandaService } from 'src/app/servicios/comanda.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { database } from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-solicita-pago',
  templateUrl: './solicita-pago.component.html',
  styleUrls: ['./solicita-pago.component.scss'],
})
export class SolicitaPagoComponent implements OnInit {
  
  pedidos = [];
  observablePedidos : Observable<any[]>;
  mostrar : boolean = true;
  mesa : string ;
  mostrarPed : boolean = false;
  loading : boolean = true;
  propina : number;
  constructor(private comandaService : ComandaService,private toast : ToastController) { }

  ngOnInit() {
    this.observablePedidos= this.comandaService.solicitaPago.snapshotChanges().pipe(map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data()
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    this.observablePedidos.subscribe(data =>{
      this.pedidos = [];
      this.pedidos = data;
      if(this.pedidos.length == 0){
        this.mostrar = false;
      }
      else{
        this.mostrar = true;
      }
      
    });
    setTimeout(()=>{
      this.loading = false;
    },3000);

  }
  mostrarP(item : any){
    if(item.mostrar){
      item.mostrar = false;
    }
    else{
      item.mostrar = true;
    }
    this.comandaService.actualizarPedido(item);
  }
  confirmarPago(item){
    let promesaMesa = this.comandaService.mesasRef.valueChanges().subscribe(data =>{
      data.forEach(mesa =>{
        if(mesa.numero == item.mesa){
          mesa.estado = 'desocupado';
          mesa.usuarioActual = 'ninguno';

          this.comandaService.mesasRef.doc(mesa.id).update(mesa);
          if(mesa.estado == 'desocupado' && mesa.usuarioActual == 'ninguno'){
            promesaMesa.unsubscribe();
          }
        }
      })
      
    })
    let promesaDis = this.comandaService.desvincularMesa(item.mesa).valueChanges().subscribe(dta =>{
      console.log(dta);
      dta.forEach(entidad =>{
        entidad.mesa = "ninguna";
        entidad.pedido = "no";
        this.comandaService.entidadRef.doc(entidad.id).update(entidad);
        if(entidad.mesa == "ninguna" && entidad.pedido == "no"){
          promesaDis.unsubscribe();
        }
      })
    })
    this.comandaService.pedidoRef.doc(item.id).delete();
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Pago confirmado, se ha desvinculado al cliente de su mesa',
      duration: 3000,
      color : "success"
    });
    toast.present();
  }

}
