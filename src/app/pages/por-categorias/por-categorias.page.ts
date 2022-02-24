import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-por-categorias',
  templateUrl: './por-categorias.page.html',
  styleUrls: ['./por-categorias.page.scss'],
})
export class PorCategoriasPage implements OnInit {

  categoria: any = {};

  constructor( private route: ActivatedRoute,
               public productoService: ProductoService ) {}

  ngOnInit() {
    this.route.snapshot.paramMap.keys.forEach((key) => {
      this.categoria[key] = this.route.snapshot.paramMap.get(key);
    });
    this.productoService.cargarPorCategoria( this.categoria.id );
  }

}
