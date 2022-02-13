import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesDetallePageRoutingModule } from './ordenes-detalle-routing.module';

import { OrdenesDetallePage } from './ordenes-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesDetallePageRoutingModule
  ],
  declarations: [OrdenesDetallePage]
})
export class OrdenesDetallePageModule {}
