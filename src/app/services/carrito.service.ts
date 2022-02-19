import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items: any[] = [];

  constructor(public alertController: AlertController,
    private platform: Platform ,
    private storage: Storage) {
      this.storage.create();
    this.cargarStorage();
    }

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
    this.guardarStorage();
  }

  async cargarStorage(){

    return new Promise( async (resolve, reject ) => {

      if( this.platform.is('capacitor') ) {
        // dispositivo
        await this.storage.get('items').then( items => {
          if (items) {
            this.items = items;
          }
          resolve(true);
        });
      } else {
        // computadora
        if ( localStorage.getItem('items') ) {
          // Existe items en el localStorage
          this.items = JSON.parse( localStorage.getItem('items') );
        }
        resolve(true);
      }
    });

  }

  private guardarStorage() {

    if( this.platform.is('capacitor')){
      // dispositivo
      this.storage.set('items', this.items);
    } else {
      // computadora
      localStorage.setItem('items', JSON.stringify( this.items ) );
    }

  }


}
