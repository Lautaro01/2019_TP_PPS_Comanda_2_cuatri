

export interface Pedido {
    estadoPedido: string;
    estadoChef: string;
    id?: string;
    mesa: string;
    productos: Producto[];
    total: string;

}


export interface Producto {
    cantidad: string;
    derivar: boolean;
    estado: string;
    imagen: string;
    nombre: string;
    tiempo: string;
    tipo: string;
    total: string;
}

