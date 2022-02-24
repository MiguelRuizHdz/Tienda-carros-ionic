import { Component,  } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage {

  constructor(public carritoService: CarritoService,
    private router: Router) { }

  ionViewWillEnter() {
    this.carritoService.cargarOrdenes();
  }

  verDetalle( orden: any ) {

    const navigationExtras: NavigationExtras = {
      queryParams: orden
    };

    this.router.navigate(['tabs/ordenes/ordenes-detalle'], navigationExtras);

  }

}
