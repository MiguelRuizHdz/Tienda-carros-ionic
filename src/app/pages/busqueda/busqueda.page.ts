import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  constructor(public productoService: ProductoService) { }

  ngOnInit() {
  }

  buscarProductos( ev ) {
    let valor = ev.target.value;
    this.productoService.buscarProducto( valor );
  }

}
