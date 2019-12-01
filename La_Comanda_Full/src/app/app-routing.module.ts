import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//alfa
import { LoginComponent } from './componentes/login/login.component';
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { MenuClienteComponent } from './componentes/menu-cliente/menu-cliente.component';
import { PedirMesaClienteComponent } from './componentes/pedir-mesa-cliente/pedir-mesa-cliente.component';
import { HacerPedidoClienteComponent } from './componentes/hacer-pedido-cliente/hacer-pedido-cliente.component';
//beta
import { MenuJefeComponent } from './componentes/menu-jefe/menu-jefe.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { VerificarEstadoPedidoComponent } from './Componentes/verificar-estado-pedido/verificar-estado-pedido.component';
import { MenuMozoComponent } from './Componentes/menu-mozo/menu-mozo.component';
import { PedidosComponent } from './Componentes/pedidos/pedidos.component';
import { ListaMetreComponent } from './Componentes/lista-metre/lista-metre.component';
import { MenuMetreComponent } from './Componentes/menu-metre/menu-metre.component';
import { MenuChefComponent } from './Componentes/menu-chef/menu-chef.component';
import { PedidosChefComponent } from './Componentes/pedidos-chef/pedidos-chef.component';
import { MenuBarmanComponent } from './Componentes/menu-barman/menu-barman.component';
import { PedidosBarmanComponent } from './Componentes/pedidos-barman/pedidos-barman.component';
import { PedirCuentaClienteComponent } from './Componentes/pedir-cuenta-cliente/pedir-cuenta-cliente.component';
import { EncuestaComponent } from './Componentes/encuesta/encuesta.component';
import { SolicitaPagoComponent } from './Componentes/solicita-pago/solicita-pago.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'registro',component:AltaClienteComponent},
  {path:'menu-cliente',component:MenuClienteComponent, children:[
    {path:'pedir-mesa-cliente',component:PedirMesaClienteComponent,pathMatch : "full"},
    {path:'hacer-pedido-cliente',component:HacerPedidoClienteComponent,pathMatch : "full"},
    {path:'verificar-estado-pedido',component:VerificarEstadoPedidoComponent,pathMatch : "full"},
    {path:'pedir-cuenta-cliente',component:PedirCuentaClienteComponent,pathMatch : "full"},
    {path:'encuesta-cliente',component:EncuestaComponent,pathMatch : "full"}
  ]},
//beta
  {path : "menu-jefe" , component : MenuJefeComponent , children :[
    {path : "lista" , component : ListaComponent , pathMatch : "full"}
  ]},
  {path : "menu-mozo" , component : MenuMozoComponent , children :[
    {path : "pedidos" , component : PedidosComponent , pathMatch : "full"},
    {path : "solicitud-pago" , component : SolicitaPagoComponent , pathMatch : "full"},
  ]},
  //gama
  // {path: 'lista-metre', component: ListaMetreComponent},
   {path: 'menu-metre', component: MenuMetreComponent, children : [
    {path: 'lista-metre', component: ListaMetreComponent},
   ]},
   {path: 'menu-chef', component: MenuChefComponent, children : [
    {path: 'pedidos-chef', component: PedidosChefComponent},
   ]},
   {path: 'menu-barman', component: MenuBarmanComponent, children : [
    {path: 'pedidos-barman', component: PedidosBarmanComponent},
   ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
