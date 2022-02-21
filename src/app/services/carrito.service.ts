import { Injectable } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UsuarioService } from './usuario.service';
import { LoginPage } from '../pages/login/login.page';
import { CarritoPage } from '../pages/carrito/carrito.page';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items: any[] = [];

  constructor(public alertController: AlertController,
    private platform: Platform,
    private usuarioService: UsuarioService,
    public modalController: ModalController,
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

  async verCarrito() {

    let modal: any;
    if( this.usuarioService.token ) {
      // mostrar pagina del carrito
      modal = await this.modalController.create({
        component: CarritoPage,
      });
    } else {
      // mostrar el login
      modal = await this.modalController.create({
        component: LoginPage,
      });
    }

    modal.present();

    modal.onWillDismiss( async ( abrirCarrito: boolean ) => {
      if( abrirCarrito ) {
        modal = await this.modalController.create({
          component: CarritoPage,
        });
        modal.present();
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
