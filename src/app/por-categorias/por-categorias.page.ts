import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductosService } from '../index.services';

@Component({
  selector: 'app-por-categorias',
  templateUrl: './por-categorias.page.html',
  styleUrls: ['./por-categorias.page.scss'],
})
export class PorCategoriasPage implements OnInit {

  public categoria: any;

  constructor(private activatedRoute: ActivatedRoute,
    private _ps: ProductosService,
    private router: Router) {

    this.activatedRoute.params.subscribe(params => {
      this.categoria = params;
    });

    this._ps.cargar_por_categoria(this.categoria.id);

  }

  ngOnInit() {
  }

  ver_producto(item: any) {
    this.router.navigate(['/producto', item]);
  }

}
