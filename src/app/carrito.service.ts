import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
import { Http, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController,
  Platform, ModalController } from '@ionic/angular';

import { URL_SERVICIOS } from '../config/url.services';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items: any[] = [];
  total_carrito: number;
  ordenes: any[] = [];
  detalle_orden: any[] = [];

  constructor(public http: Http, public alertCtrl: AlertController,
    public toastCtrl: ToastController, private platform: Platform,
    private storage: Storage, public _us: UsuarioService) {

      this.cargar_storage();
      this.actualizar_total();
  }

  async realizar_pedido() {
    const data = new URLSearchParams();
    let codigos: string [] = [];

    for (let item of this.items) {
      codigos.push(item.codigo);
    }

    data.append('items', codigos.join(','));

    let url = URL_SERVICIOS + '/pedidos/realizar_orden/' + this._us.token + '/' + this._us.usuario;

    await this.http.post(url, data)
      .subscribe( resp => {
        let respuesta = resp.json();

        console.log(respuesta);

        this.presentar_mensaje(respuesta.error);
    });

  }

  async presentar_mensaje( error: any) {
    if (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error! No se ha podido generar el pedido, intente nuevamente.',
        duration: 1500,
        position: "middle"
      });
      toast.present();
    } else {
      this.items = [];
      const alerta = await this.alertCtrl.create({
        header: 'Enhorabuena!',
        subHeader: 'Pedido recibido correctamente, pronto nos contactaremos con usted.',
        buttons: ['OK']
      });
      await alerta.present();

      if(this.platform.is('cordova')) {
        //dispositivo
        this.storage.set('items', this.items);
      } else {
        //pc
        localStorage.setItem("items", JSON.stringify(this.items));
      }
    }
  }

  remover_item(idx: any) {
    this.items.splice(idx, 1);
    this.guardar_storage();
  }

  actualizar_total() {
    this.total_carrito = 0;

    for (let item of this.items) {
      this.total_carrito += Number(item.precio_compra);
    }
  }

  async agregar_carrito(item_parametro: any) {

    for (const item of this.items) {
      if (item.codigo === item_parametro.codigo) {

        const alerta = await this.alertCtrl.create({
          header: 'Item ya existe',
          subHeader: item_parametro.producto + ' ya se encuentra en el carrito.',
          buttons: ['OK']
        });
        await alerta.present();
        return;
      }
    }

    const toast = await this.toastCtrl.create({
      message: item_parametro.producto + ' agregado al carrito.',
      duration: 1500,
      position: "middle"
    });
    toast.present();

    this.items.push( item_parametro );
    this.guardar_storage();
    this.actualizar_total();
  }

  private guardar_storage() {

    if(this.platform.is('cordova')) {
      //dispositivo
      this.storage.set('items', this.items);
    } else {
      //pc
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  }

  private cargar_storage() {

    const promesa = new Promise((resolve, reject) => {

      if(this.platform.is('cordova')) {

        //dispositivo
        this.storage.ready().then( () => {
          this.storage.get('items').then( items => {
            if (items) {
              this.items = items;
            }
            resolve();
          });
        });
      } else {

        //pc
        if (localStorage.getItem('items')) {
          this.items = JSON.parse( localStorage.getItem('items'));
        }
        resolve();
      }
    });

    return promesa;
  }


  cargar_ordenes() {

    const url = URL_SERVICIOS + '/pedidos/obtener_pedidos/' + this._us.token + '/' + this._us.usuario;

    this.http.get(url)
      .pipe(map(resp => resp.json()))
      .subscribe(data => {

        if (data.error) {
          //todo
        } else {

          this.ordenes = data.ordenes;

          console.log(this.ordenes);
        }
      });
  }

  cargar_orden_id(id_orden: any) {

    const url = URL_SERVICIOS + '/pedidos/obtener_pedidos_id/' + this._us.token + '/'
      + this._us.usuario + '/' + id_orden;

    this.http.get(url)
      .pipe(map(resp => resp.json()))
      .subscribe(data => {

        if (data.error) {
          //todo
        } else {

          this.detalle_orden = data.detalle;

        }
      });
  }


  eliminar_orden(id_orden: any) {
    const url = URL_SERVICIOS + '/pedidos/borrar_pedido/' + this._us.token + '/'
      + this._us.usuario + '/' + id_orden;

    return this.http.delete(url)
      .pipe(map(resp => resp.json()));
  }
}
