import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss'],
})
export class OrdenesDetallePage implements OnInit {

  orden = {};

  constructor(private router: Router,
    private carritoService: CarritoService,
    private navCtrl: NavController) {}

  ngOnInit() {
    this.orden = this.router.getCurrentNavigation().extras.queryParams;
  }

  borrarOrden( ordenId: string ) {
    this.carritoService.borrarOrden( ordenId )
                        .subscribe( (resp: any) => {
                          if( resp.error ) {
                            // Manejo de errores
                          } else {
                            this.navCtrl.pop();
                          }
                        });
  }

}
