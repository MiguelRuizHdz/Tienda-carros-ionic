import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PorCategoriasPage } from './por-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: PorCategoriasPage
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
export class PorCategoriasPageRoutingModule {}
