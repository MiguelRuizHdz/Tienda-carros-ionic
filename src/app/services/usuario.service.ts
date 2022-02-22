import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  idUsuario: string;

  constructor(private http: HttpClient,
    private platform: Platform,
    private storage: Storage,
    public alertController: AlertController) {
      this.cargarStorage();
    }

  activo(): boolean {
    return this.token ? true : false;
  }

  async handleError(error: HttpErrorResponse, msg: string) {
    // Aquí hay un problema
    await (await this.alertController.create({
      header: msg,
      subHeader: error.error.mensaje,
      buttons: ['OK']
    })).present();
  }

  async ingresar( correo: string, contrasena: string ) {

    const data = { correo, contrasena };

    return new Promise( resolve => {

      this.http.post( `${ URL }/login`, data )
                .subscribe( async (dataResp: any) => {
                  if( dataResp.error.error ) {
                    // Aquí hay un problema
                    this.handleError(dataResp, 'Error al iniciar sesión');
                    resolve(false);
                  } else {
                    this.token = dataResp.token;
                    this.idUsuario = dataResp.id_usuario;
                    // Guardar Storage
                    this.guardarStorage();
                    resolve(true);
                  }
                }, async dataError => {
                  // Aquí hay un problema
                  this.handleError(dataError, 'Error al iniciar sesión');
                  resolve(false);
                });
    });
  }

  cerrarSesion(){
    this.token = null;
    this.idUsuario = null;

    // Guardar Storage
    this.guardarStorage();
  }

  async cargarStorage(){

    return new Promise( async (resolve, reject ) => {

      if( this.platform.is('capacitor') ) {
        // dispositivo
        await this.storage.get('token').then( token => {
          if (token) {
            this.token = token;
          }
          resolve(true);
        });
        await this.storage.get('idUsuario').then( idUsuario => {
          if (idUsuario) {
            this.idUsuario = idUsuario;
          }
          resolve(true);
        });
      } else {
        // computadora
        if ( localStorage.getItem('token') ) {
          // Existe token en el localStorage
          this.token = localStorage.getItem('token');
        }
        if ( localStorage.getItem('idUsuario') ) {
          // Existe idUsuario en el localStorage
          this.idUsuario = localStorage.getItem('idUsuario');
        }
        resolve(true);
      }
    });

  }

  private guardarStorage() {

    if( this.platform.is('capacitor')){
      // dispositivo
      this.storage.set('token', this.token);
      this.storage.set('idUsuario', this.idUsuario);
    } else {
      // computadora
      if( this.token ){
        localStorage.setItem('token', this.token );
        localStorage.setItem('idUsuario', this.idUsuario );
      } else {
        // Borrandolos en el storage
        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario');
      }
    }

  }

}
