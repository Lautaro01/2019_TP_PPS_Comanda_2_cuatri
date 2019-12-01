import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoPedido'
})
export class EstadoPedidoPipe implements PipeTransform {
  
  transform(dato: string , value2?: any , value3?: any): any {

    if (dato === 'pendiente') {
      return 'Elaborar pedido';
    } else {
      return 'Pedido listo';
    }

  }

}
