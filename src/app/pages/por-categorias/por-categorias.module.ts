import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PorCategoriasPageRoutingModule } from './por-categorias-routing.module';

import { PorCategoriasPage } from './por-categorias.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    PorCategoriasPageRoutingModule
  ],
  declarations: [PorCategoriasPage]
})
export class PorCategoriasPageModule {}
