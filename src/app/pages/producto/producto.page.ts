/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

export interface Producto {
  codigo?:        string;
  producto?:      string;
  linea?:         string;
  linea_id?:      string;
  proveedor?:     string;
  descripcion?:   string;
  precio_compra?: string;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto: Producto = {};

  constructor(private route: ActivatedRoute,
    public carritoService: CarritoService ) { }

  ngOnInit() {
    this.route.snapshot.paramMap.keys.forEach((key) => {
      this.producto[key] = this.route.snapshot.paramMap.get(key);
    });
    console.log(this.producto);
  }

}
