import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public productoService: ProductoService) {}

  siguientePagina( event ) {
    this.productoService.cargarTodos()
        .then( () => {
          event.target.complete();
        });
  }
}
