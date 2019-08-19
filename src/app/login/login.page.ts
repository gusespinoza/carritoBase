import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: any ;
  contrasena: any ;

  constructor(private modalCtrl: ModalController, public _us: UsuarioService,
    public alertCtrl: AlertController, public toastCtrl: ToastController, public router: Router) {
    this.correo = 'gustavo.espinozas@gmail.com';
    this.contrasena = '123456';
  }

  ngOnInit() {
  }

  async ingresar() {
    await this._us.ingresar(this.correo, this.contrasena)
      .subscribe( () => {
      });

    if (this._us.token === '') {
      const alerta = await this.alertCtrl.create({
        header: 'Error LogIn',
        subHeader: 'Usuario y/o contraseña inválidos.',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    } else {
      console.log('login ok');

      this.router.navigate(['']);
      this.modalCtrl.dismiss();

      const toast = await this.toastCtrl.create({
        message: '¡Bienvenido!',
        duration: 1800,
        position: 'middle'
      });
      toast.present();
    }
  }

  salir() {
    console.log('sale del login');
    this.modalCtrl.dismiss();
  }

}
