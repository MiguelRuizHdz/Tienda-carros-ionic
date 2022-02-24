import { Injectable } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UsuarioService } from './usuario.service';
import { LoginPage } from '../pages/login/login.page';
import { CarritoPage } from '../pages/carrito/carrito.page';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items: any[] = [];
  totalCarrito = 0;
  ordenes: any[] = [];

  constructor(public alertController: AlertController,
    private platform: Platform,
    private http: HttpClient,
    private usuarioService: UsuarioService,
    public modalController: ModalController,
    private storage: Storage) {
      this.storage.create();
      this.cargarStorage();
      this.actualizarTotal();
    }

  async agregarCarrito( itemParametro: any ) {
    for( const item of this.items ) {
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
    this.actualizarTotal();
    this.guardarStorage();
  }

  actualizarTotal() {
    this.totalCarrito = 0;
    for( const item of this.items ) {
      this.totalCarrito += Number( item.precio_compra );
    }
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

    const { abrirCarrito } = await modal.onWillDismiss();
    if ( abrirCarrito ) {
      modal = await this.modalController.create({
        component: CarritoPage,
      });
      modal.present();
    }
  }

  removerItem( idx: number){
    this.items.splice(idx,1);
  }

  realizarPedido(){
    let codigos: string[] = [];

    for (const item of this.items) {
      codigos.push( item.codigo );
    }

    const data = new HttpParams().append('items', codigos.join(','));

    return this.http.post(`${ URL }/pedidos/realizar_orden/${ this.usuarioService.token }/${ this.usuarioService.idUsuario }`, data )
                .subscribe( async resp => {
                  this.items = [];
                  await (await this.alertController.create({
                    header: 'Orden realizada!',
                    subHeader: 'Nos contactaremos con usted próximamente.',
                    buttons: ['OK']
                  })).present();
                },
                async dataError => {
                  // Aquí hay un problema
                  this.usuarioService.handleError(dataError, 'Error al realizar pedido');
                });
  }

  cargarOrdenes() {

    console.log('Entramos');
    const url = `${ URL }/pedidos/obtener_pedidos/${ this.usuarioService.token }/${ this.usuarioService.idUsuario }`;
    return this.http.get( url )
                    .subscribe( (data: any) => {
                      this.ordenes = data.ordenes;
                    },
                    async dataError => {
                      // Aquí hay un problema
                      this.usuarioService.handleError(dataError, 'Error al cargarOrdenes');
                    });

  }

  borrarOrden( ordenId: string ) {
    const url = `${ URL }/pedidos/borrar_pedido/${ this.usuarioService.token }/${ this.usuarioService.idUsuario }/${ ordenId }`;
    return this.http.delete( url );
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
