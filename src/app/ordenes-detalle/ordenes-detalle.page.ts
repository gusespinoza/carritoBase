import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { AlertController, ToastController } from '@ionic/angular';

import * as moment from 'moment';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss']
})
export class OrdenesDetallePage implements OnInit {
  orden: any;
  total_carrito: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public _cs: CarritoService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.orden = params;
    });

    console.log('carga orden ' + this.orden.id);

    this._cs.cargar_orden_id(this.orden.id);

    this.total_carrito = 0;

    for (let item of this._cs.detalle_orden) {
      this.total_carrito += Number(item.precio_compra);
    }
  }

  ngOnInit() {}

  eliminar_pedido(id_orden: any) {

    console.log(id_orden);

    this._cs.eliminar_orden(id_orden).subscribe(data => {
      if (data.error) {
        this.presentarMensajeError(data);
      } else {
        this.cambiarVista();
      }
    });
  }

  async presentarMensajeError(data: any) {
    const alerta = await this.alertCtrl.create({
      header: 'Error!',
      subHeader: data.mensaje,
      buttons: ['OK']
    });
    await alerta.present();
  }

  async cambiarVista() {
    const toast = await this.toastCtrl.create({
      message: 'Orden eliminada con éxito!',
      duration: 1500,
      position: 'middle'
    });
    toast.present();

    this.router.navigate(['/ordenes']);
  }

  formatear_fecha(fecha: any) {

    const fechaForm = moment(fecha);
    fechaForm.locale('es');
    return fechaForm.format('DD-mm-YY HH:mm');
  }


  repetir_pedido(orden: any) {

  }
}
