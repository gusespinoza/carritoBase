import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CarritoService } from '../index.services';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  public item: any;


  constructor( private activatedRoute: ActivatedRoute, private _cs: CarritoService) {

  }

  ngOnInit() {
  	this.activatedRoute.params.subscribe(params => {
  		this.item = params;
  	});
  	console.log(this.item);
  }

}
