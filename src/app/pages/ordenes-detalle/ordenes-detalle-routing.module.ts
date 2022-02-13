import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesDetallePage } from './ordenes-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesDetallePageRoutingModule {}
