import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuMetreComponent } from './componentes/menu-metre/menu-metre.component';
import { ListaMetreComponent } from './componentes/lista-metre/lista-metre.component';
import { MenuChefComponent } from './componentes/menu-chef/menu-chef.component';
import { PedidosChefComponent } from './componentes/pedidos-chef/pedidos-chef.component';
import { MenuBarmanComponent } from './componentes/menu-barman/menu-barman.component';
import { PedidosBarmanComponent } from './componentes/pedidos-barman/pedidos-barman.component';
import { RutasComponent } from './componentes/rutas/rutas.component';


const routes: Routes = [
  // { path: '', redirectTo: 'menu-metre', pathMatch: 'full' },
  { path: '', redirectTo: 'rutas', pathMatch: 'full' },
   {path: 'lista-metre', component: ListaMetreComponent},
   {path: 'rutas', component: RutasComponent},
   {path: 'menu-metre', component: MenuMetreComponent, children : [
    {path: 'lista-metre', component: ListaMetreComponent},
   ]},
   {path: 'menu-chef', component: MenuChefComponent, children : [
    {path: 'pedidos-chef', component: PedidosChefComponent},
   ]},
   {path: 'menu-barman', component: MenuBarmanComponent, children : [
    {path: 'pedidos-barman', component: PedidosBarmanComponent},
   ]},


   

  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
