import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../index.services';
import { OrdenesDetallePage } from '../index.paginas';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

import * as moment from 'moment';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage implements OnInit {

  constructor(public _cs: CarritoService,
    public _us: UsuarioService,
    private modalCtrl: ModalController,
    public router: Router) {}

  ngOnInit() {
  }

  async ionViewWillEnter() {

    let modal: any;

    if (this._us.token) {
      this._cs.cargar_ordenes();
    } else {
      modal = await this.modalCtrl.create({
        component: LoginPage
      });

      modal.present();
    }
  }

  ver_detalle_orden( ord: any) {

    this.router.navigate(['/ordenes-detalle', ord]);
  }

  formatear_fecha(fecha: any) {

    const fechaForm = moment(fecha);
    fechaForm.locale('es');
    return fechaForm.format('dddd, D MMMM YYYY, HH:mm');
  }

}
