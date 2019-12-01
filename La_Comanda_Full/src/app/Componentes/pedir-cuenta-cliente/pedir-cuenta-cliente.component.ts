import { Component, OnInit,OnDestroy } from '@angular/core';
import { VerificarPedidoService } from '../../Servicios/verificar-pedido.service';
import { Pedido } from '../../modals/pedido';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedir-cuenta-cliente',
  templateUrl: './pedir-cuenta-cliente.component.html',
  styleUrls: ['./pedir-cuenta-cliente.component.scss'],
})
export class PedirCuentaClienteComponent implements OnInit {

  colecion: AngularFirestoreCollection<Pedido>
  
  constructor(private pedido : VerificarPedidoService, private angularFirestore : AngularFirestore,private ruta : Router, private barcodeScanner : BarcodeScanner,private toastController: ToastController) {
    this.colecion = this.angularFirestore.collection<Pedido>("pedidos");
   }

   propinahtml : string = "sin propina";
   nuevoPedido : any;
   cuenta : string;
  ngOnInit() {
    this.pedirCuenta();
  }

  pedirCuenta(){
    let promesa = this.pedido.traerDatosUsuario().subscribe(
      datos=>
      {
        this.cuenta = "pedir";
        this.pedido.traerPedidoPorMesa(datos['0'].mesa).subscribe(
          pedido =>
          {
            this.nuevoPedido = pedido['0'];
            this.cuenta = "pagar";
            if(this.nuevoPedido.estadoPedido == "solicitaPago")
            {
              this.cuenta = "confirmar";
            }
          })

        if(datos[0].mesa == "ninguna")
        {
          this.cuenta = "chau";
          promesa.unsubscribe();
          this.ruta.navigate(["/menu-cliente/pedir-mesa-cliente"]);
        }

        if(datos[0].pedido == "no")
        {
          this.cuenta = "chau";
        }
      }
    )
  }

  pagar()
  {
    this.colecion.doc(this.nuevoPedido.id).update(
      {
        estadoPedido : "solicitaPago"
      }
      )
      this.cuenta = "confirmar";
  }

  propina()
  {  
    if(this.propinahtml == "sin propina")
    {
    this.barcodeScanner.scan().then(
      barcodeData => 
      {
      
        switch (barcodeData.text) {
          case 'Excelente':
            this.propinahtml = "Exelente (20%)";
            this.nuevoPedido.total = this.nuevoPedido.total * 1.20;
            break;
          case 'Muy Bien':
            this.propinahtml = "Muy Bien (15%)";
            this.nuevoPedido.total = this.nuevoPedido.total * 1.15;
            break;
          case 'Bien':
            this.propinahtml = "Bien (10%)";
            this.nuevoPedido.total = this.nuevoPedido.total * 1.10;
            break;
          case 'Regular':
            this.propinahtml = "Regular (5%)";
            this.nuevoPedido.total = this.nuevoPedido.total * 1.05;
            break;
          case 'Malo':
            this.propinahtml = "Malo (0%)";
            break;
          default:
              this.mensaje("QR incorrecto, esto no es una propina" + this.propinahtml,"danger");
            break;
        }
      }
      )
    }
    else
    {
      this.mensaje("Usted ya dejo una propina: " + this.propinahtml,"danger");
    }
  }

  async mensaje(texto,color)
  {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2500,
      position:"middle",
      color : color,
      buttons: [{
          text: 'x',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    toast.present();
  }
}
