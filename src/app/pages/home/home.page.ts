import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public productoService: ProductoService,
    public carritoService: CarritoService,
    public usuarioService: UsuarioService ) {}

  siguientePagina( event ) {
    this.productoService.cargarTodos()
        .then( () => {
          event.target.complete();
        });
  }
}
