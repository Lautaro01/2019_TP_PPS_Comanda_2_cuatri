import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { VerificarPedidoService } from '../../Servicios/verificar-pedido.service';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-verificar-estado-pedido',
  templateUrl: './verificar-estado-pedido.component.html',
  styleUrls: ['./verificar-estado-pedido.component.scss'],
})
export class VerificarEstadoPedidoComponent implements OnInit {

  constructor(private verificar : VerificarPedidoService,
    private barcodeScanner : BarcodeScanner,
    private toastController: ToastController,) {
      let mesaId = localStorage.getItem("mesaCliente");
      this.escucharPedido(mesaId);
     }

  ngOnInit() {
    let mesaId = localStorage.getItem("mesaCliente");
    this.escucharPedido(mesaId);
    console.log(mesaId);
  }

  pedido : any;
  usuario : any;
  verificarPerido : string = "si";
  
  verificarPedidoQr()
  {
    let mesa = localStorage.getItem("mesaCliente");
    this.barcodeScanner.scan().then(
      barcodeData => 
      {
        if(mesa == barcodeData.text)
        {
          try{
            this.escucharPedido(barcodeData.text);
            let promesa = this.verificar.traerPedidoPorMesa(barcodeData.text).subscribe(
              async pedido =>
              {
                console.log(pedido[0]);
                let mensaje = "<h2>Estado de su pedido</h2>";
                this.pedido = pedido[0];
                this.pedido.productos.forEach(producto => {
                  if(producto.tipo == "comida")
                    {
                      switch (producto.estado){
                        case "pendiente":
                          mensaje += "Comida: " + producto.nombre + "<br>Estado: su pedido esta en manos del mozo y lo llevara al chef<br>Tiempo de espera: " + producto.tiempo +"Min. aprox." + "<hr>";
                        break;
                        case "enviado":
                        mensaje += "Comida: " + producto.nombre + "<br>Estado: Pedido enviado al Chef<br>Tiempo de espera: " + producto.tiempo +"Min. aprox." + "<hr>";
                        break;
                        case "enProceso":
                          mensaje += "Comida: " + producto.nombre + "<br>Estado:¡Nuestro chef esta cocinando su pedido!(En proceso)<br>Tiempo de espera: " + producto.tiempo +"Min. aprox." + "<hr>";
                          break;
                        case "listo":
                          mensaje += "Comida: " + producto.nombre + "<br>Estado:¡La comida ya esta lista! espere al mozo con su pedido<hr>";
                          break;
                      }
                    }
                    else{
                      switch (producto.estado){
                        case "pendiente":
                            mensaje += "Bebiba: " + producto.nombre + "<br>Estado: su pedido esta en manos del mozo lo llevara al barman<br>Tiempo de espera: " + producto.tiempo +"Min. aprox." + "<hr>";
                          break;
                        case "enviado":
                        mensaje += "Bebida: " + producto.nombre + "<br>Estado: Pedido enviado al Barman<br>Tiempo de espera: 5Min. aprox.<hr>";
                        break;
                        case "enProceso":
                          mensaje += "Bebida: " + producto.nombre + "<br>Estado:¡El barman esta preparando su trago!(En proceso)<br>Tiempo de espera: 5Min. aprox.<hr>";
                          break;
                          case "listo":
                            mensaje += "Bebida: " + producto.nombre + "<br>Estado:¡La bebida ya esta lista! espere al mozo con su pedido<hr>";
                            break;
                          }
                        }
                      });
                const toast = await this.toastController.create({
                  message: mensaje,
                  duration: 10000,
                  position: "middle",
                  color : "light",
                  buttons: [{
                    text: 'x',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    }]
                });
                toast.present();
                 promesa.unsubscribe();
                })
        }
        catch(err) {
          
        }
      }
      else
      {
        this.mensaje("Esta mesa no le pertenece, escane su mesa para verificar el estado su pedido","danger");
      }
      })
  }

  escucharPedido(numero : string)
    {
      console.log("Entre a escuchar pedido");
      let promesa2 = this.verificar.traerPedidoPorMesa(numero).subscribe(
      pedido2 =>
      {
        console.log(pedido2[0].estadoPedido);
        if(pedido2[0].estadoPedido == "listo" || pedido2[0].estadoPedido == "solicitaPago")
        {
          this.verificar.cambiarEstadoAresivido();
          this.verificar.traerDatosUsuario().subscribe(
            datos =>
            {

              console.log(datos[0].pedido);
              if(datos[0].pedido == "recibido")
              {
                this.verificarPerido = "no";
                promesa2.unsubscribe();
              }
              else if(datos[0].pedido == "verificado")
              {
                this.verificarPerido = "verificado";
                promesa2.unsubscribe();
              }
            }
          ) 
        }
      })
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

  confirmarPedidoHTML()
  {

    let mesaId = localStorage.getItem("mesaCliente");
    this.barcodeScanner.scan().then(
      barcodeData => 
      {
        if(mesaId == barcodeData.text)
        {
          this.verificarPerido = "verificado";
          this.verificar.confirmarPedido();
        }
        else
        {
          this.mensaje("Esta mesa no te pertenece, escane su mesa para confirmar la recepcion de su pedido","danger");
        }
      })
   
  }

}
