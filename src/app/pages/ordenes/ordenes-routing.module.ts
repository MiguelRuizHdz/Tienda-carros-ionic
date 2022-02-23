import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesPage } from './ordenes.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesPage
  },
  {
    path: 'ordenes-detalle',
    loadChildren: () => import('../ordenes-detalle/ordenes-detalle.module').then( m => m.OrdenesDetallePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesPageRoutingModule {}
