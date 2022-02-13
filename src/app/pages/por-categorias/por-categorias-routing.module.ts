import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PorCategoriasPage } from './por-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: PorCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PorCategoriasPageRoutingModule {}
