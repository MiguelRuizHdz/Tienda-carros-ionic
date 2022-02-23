import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesDetallePageRoutingModule } from './ordenes-detalle-routing.module';

import { OrdenesDetallePage } from './ordenes-detalle.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesDetallePageRoutingModule,
    PipesModule
  ],
  declarations: [OrdenesDetallePage]
})
export class OrdenesDetallePageModule {}
