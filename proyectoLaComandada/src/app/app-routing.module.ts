import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuJefeComponent } from './componentes/menu-jefe/menu-jefe.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { MenuMozoComponent } from './componentes/menu-mozo/menu-mozo.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';

const routes: Routes = [
  {path : "menu" , component : MenuJefeComponent , children :[
    {path : "lista" , component : ListaComponent , pathMatch : "full"}
  ]},
  {path : "menu-mozo" , component : MenuMozoComponent , children :[
    {path : "pedidos" , component : PedidosComponent , pathMatch : "full"}
  ]},
  {path : "" , redirectTo : "/menu-mozo/pedidos" , pathMatch : "full"},
  {path : "lista" ,component:ListaComponent},

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
