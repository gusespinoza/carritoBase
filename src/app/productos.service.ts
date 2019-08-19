import { Injectable } from "@angular/core";

import { Http } from "@angular/http";

import { URL_SERVICIOS } from "../config/url.services";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  public pagina: any = 0;
  public productos: any[] = [];
  public lineas: any[] = [];
  public porCategoria: any[] = [];
  public resultados: any[] = [];

  constructor(public http: Http) {
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_lineas() {
    let promesa = new Promise((resolve, reject) => {
      let url = URL_SERVICIOS + "/lineas";

      this.http
        .get(url)
        .pipe(map(resp => resp.json()))
        .subscribe(data => {
          console.log(data);

          if (data.error) {
            //todo
          } else {
            this.lineas = data.lineas;
          }

          resolve();
        });
    });

    return promesa;
  }

  cargar_todos() {
    let promesa = new Promise((resolve, reject) => {
      let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;

      this.http
        .get(url)
        .pipe(map(resp => resp.json()))
        .subscribe(data => {
          console.log(data);

          if (data.error) {
            //todo
          } else {
            let nuevaData = this.agrupar(data.productos, 2);

            this.productos.push(...nuevaData);
            this.pagina += 1;
          }

          resolve();
        });
    });

    return promesa;
  }

  private agrupar(arr: any, tamano: number) {
    let nuevo_arreglo = [];

    for (let i = 0; i < arr.length; i += tamano) {
      nuevo_arreglo.push(arr.slice(i, i + tamano));
    }

    console.log(nuevo_arreglo);

    return nuevo_arreglo;
  }

  public cargar_por_categoria(categoria: any) {
		
		let url = URL_SERVICIOS + '/productos/buscar_categoria/' + categoria;

    this.http
      .get(url)
      .pipe(map(resp => resp.json()))
      .subscribe(data => {
        console.log(data);

        if (data.error) {
          //todo
        } else {
          this.porCategoria = data.productos;
        }
      });
  }

  public buscar_producto(termino: string) {

    let url = URL_SERVICIOS + '/productos/buscar/' + termino;

    this.http
      .get(url)
      .pipe(map(resp => resp.json()))
      .subscribe(data => {

        if (data.error) {
          //todo
        } else {
          this.resultados = data.productos;
        }

        console.log(data.productos);
      });
  }

}
