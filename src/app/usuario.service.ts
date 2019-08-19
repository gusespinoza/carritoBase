import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../config/url.services';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string;
  public usuario: string;

  constructor(public http: Http, public alertCtrl: AlertController,
    public platform: Platform, public storage: Storage) { }


  ingresar( correo: string, contrasena: string) {

    const data = new URLSearchParams();

    data.append('correo', correo);
    data.append('contrasena', contrasena);

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, data)
          .pipe(
            map( resp => {
              const data_resp = resp.json();

              console.log(data_resp);

              if ( data_resp.error ) {
                // return error alert
              } else {
                this.token = data_resp.token;
                this.usuario = data_resp.id_usuario;

                this.guardar_storage();
              }
            })
          );
  }

  cerrar_sesion() {

    this.token = null;
    this.usuario = null;

    this.guardar_storage();
  }

  private guardar_storage() {

    if (this.platform.is('cordova')) {
      // dispositivo
      this.storage.set('token', this.token);
      this.storage.set('usuario', this.usuario);
    } else {
      // pc
      if (this.token) {

        console.log('guardar_storage token: ' + this.token);
        localStorage.setItem('token', this.token);
        localStorage.setItem('usuario', this.usuario);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
      }

    }
  }

  private cargar_storage() {

    const promesa = new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {

        // dispositivo
        this.storage.ready().then( () => {
          this.storage.get('token').then( token => {
            if (token) {
              this.token = token;
            }
          });

          this.storage.get('usuario').then( usuario => {
            if (usuario) {
              this.usuario = usuario;
            }
            resolve();
          });
        });

      } else {

        // pc
        if (localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.usuario = localStorage.getItem('usuario');
        }
        resolve();
      }
    });

    return promesa;
  }

}
