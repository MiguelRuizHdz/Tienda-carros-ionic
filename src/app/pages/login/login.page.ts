import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo = '';
  contrasena = '';

  constructor(public modalController: ModalController,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async ingresar() {
    if( this.usuarioService.activo() ){
      this.dismiss();
    }
    const valido = await this.usuarioService.ingresar( this.correo, this.contrasena );

    console.log(valido);
  }

}
