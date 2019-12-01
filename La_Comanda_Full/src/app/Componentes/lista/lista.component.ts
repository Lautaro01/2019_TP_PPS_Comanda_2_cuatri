import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComandaService } from 'src/app/servicios/comanda.service';
import { map } from 'rxjs/operators';
import { Entidad } from 'src/app/modals/entidad';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  entidades : Observable<Entidad[]>;
  clientesPendientes = [];
  mostrar : boolean = true;
  jefeLogueado = {nombre : "Daniel" , apellido : "Holub" , path : "../../../assets/jefe.png" , perfil : "Supervisor"};
  loading : boolean = true;
  constructor(private comandaServicio : ComandaService) {
  }

  ngOnInit() {
    this.entidades = this.comandaServicio.traerEntidades().snapshotChanges().pipe(map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data() as Entidad;
        data.id = a.payload.doc.id;
        return data;

      })
    }));
    this.entidades.subscribe(data=>{
      this.clientesPendientes = [];
      data.forEach(element => {
         if(element.perfil == "cliente" && element.estado == "pendiente"){
          this.clientesPendientes.push(element);
         }
      })
      console.log("Clientes pendientes : " + this.clientesPendientes.length);
      if(this.clientesPendientes.length == 0){
        this.mostrar = false;
      }
      else{
        this.mostrar = true;
      }
    });
    setTimeout(()=>{
      this.loading = false;
    },4000);
    
  }
   cambiarEstado(estado : string,obj : Entidad) {
     this.comandaServicio.cambiarEstado(estado,obj);
   }
  
  


}
