import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PorCategoriasPageRoutingModule } from './por-categorias-routing.module';

import { PorCategoriasPage } from './por-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PorCategoriasPageRoutingModule
  ],
  declarations: [PorCategoriasPage]
})
export class PorCategoriasPageModule {}
