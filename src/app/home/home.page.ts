import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {
  CarritoService,
  ProductosService,
  UsuarioService
} from '../index.services';
import { LoginPage } from '../login/login.page';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    private _ps: ProductosService,
    private router: Router,
    public _cs: CarritoService,
    public _us: UsuarioService,
    private modalCtrl: ModalController
  ) {}

  siguiente_pagina(infiniteScroll) {
    this._ps.cargar_todos().then(() => {
      infiniteScroll.target.complete();
    });
  }

  ver_producto(item: any) {
    this.router.navigate(['/producto', item]);
  }

  async ver_carrito() {
    let modal: any;

    console.log("token " + this._us.token);

    if (this._us.token) {
      this.router.navigate(['/carrito']);
    } else {
      modal = await this.modalCtrl.create({
        component: LoginPage
      });

      modal.present();

      modal.onDidDismiss((abrirCarrito: boolean) => {
        if (abrirCarrito) {
          this.router.navigate(['/home']);
        }
      });
    }
  }

  async cerrar_sesion() {
    let modal: any;

    modal = await this.modalCtrl.create({
      component: LoginPage
    });

    modal.present();

    modal.onDidDismiss((abrirCarrito: boolean) => {
      if (abrirCarrito) {
        this.router.navigate(['/home']);
      }
    });
  }

  buscar_producto(ev: any) {
    const valor = ev.target.value;
    console.log(valor);

    this._ps.buscar_producto(valor);
  }
}
