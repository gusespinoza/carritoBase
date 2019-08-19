import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'carrito', loadChildren: './carrito/carrito.module#CarritoPageModule' },
  { path: 'categorias', loadChildren: './categorias/categorias.module#CategoriasPageModule' },
  { path: 'ordenes', loadChildren: './ordenes/ordenes.module#OrdenesPageModule' },
  { path: 'ordenes-detalle', loadChildren: './ordenes-detalle/ordenes-detalle.module#OrdenesDetallePageModule' },
  { path: 'por-categorias', loadChildren: './por-categorias/por-categorias.module#PorCategoriasPageModule' },
  { path: 'producto', loadChildren: './producto/producto.module#ProductoPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'buscador', loadChildren: './buscador/buscador.module#BuscadorPageModule' },
  { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
