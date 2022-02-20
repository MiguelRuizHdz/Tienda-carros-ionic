import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  idUsuario: string;

  constructor(private http: HttpClient,
    public alertController: AlertController) { }

  async ingresar( correo: string, contrasena: string ) {

    const data = { correo, contrasena };

    return new Promise( resolve => {

      this.http.post( `${ URL }/login`, data )
                .subscribe( async (dataResp: any) => {
                  console.log(dataResp);
                  if( dataResp.error.error ) {
                    // Aquí hay un problema
                    await (await this.alertController.create({
                      header: 'Error al iniciar',
                      subHeader: dataResp.mensaje,
                      buttons: ['OK']
                    })).present();

                    resolve(false);
                  } else {
                    this.token = dataResp.token;
                    this.idUsuario = dataResp.id_usuario;
                    resolve(true);
                  }
                });
    });
  }


}
