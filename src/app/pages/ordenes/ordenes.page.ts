import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage implements OnInit {

  constructor(public carritoService: CarritoService) { }

  ngOnInit() {
    this.carritoService.cargarOrdenes();
  }

}
