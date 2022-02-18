import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items: any[] = [];

  constructor(public alertController: AlertController) { }

  async agregarCarrito( itemParametro: any ) {
    for( let item of this.items ) {
      if( item.codigo === itemParametro.codigo ) {

        await (await this.alertController.create({
          header: 'Producto existe',
          subHeader: itemParametro.producto + ', ya se encuentra en su carrito de compras.',
          buttons: ['OK']
        })).present();

        return;
      }
    }

    this.items.push( itemParametro );
  }


}
