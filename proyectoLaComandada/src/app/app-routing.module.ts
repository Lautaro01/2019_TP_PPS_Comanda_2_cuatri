import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuMetreComponent } from './componentes/menu-metre/menu-metre.component';
import { ListaMetreComponent } from './componentes/lista-metre/lista-metre.component';

const routes: Routes = [
   { path: '', redirectTo: 'menu-metre', pathMatch: 'full' },
   {path: 'lista-metre', component: ListaMetreComponent},
   {path: 'menu-metre', component: MenuMetreComponent, children :[
    {path: 'lista-metre', component: ListaMetreComponent},
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
