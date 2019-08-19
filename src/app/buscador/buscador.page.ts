import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  constructor(private _ps: ProductosService, private router: Router) { }

  ngOnInit() {
  }

  buscar_producto(ev: any) {
    let valor = ev.target.value;
    console.log(valor);

    this._ps.buscar_producto(valor);
  }

  ver_producto(item: any) {
    this.router.navigate(['/producto', item]);
  }
}

