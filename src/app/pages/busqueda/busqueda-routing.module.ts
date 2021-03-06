import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaPage } from './busqueda.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaPage
  },
  {
    path: 'producto',
    loadChildren: () => import('../producto/producto.module').then( m => m.ProductoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaPageRoutingModule {}
