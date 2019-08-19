import { Component, OnInit } from '@angular/core';

import { ProductosService } from '../index.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(public _ps: ProductosService,
    private router: Router) {

  }

  ngOnInit() {
  }

  ver_categoria(categoria: any) {
    this.router.navigate(['/por-categorias', categoria]);
  }

}
