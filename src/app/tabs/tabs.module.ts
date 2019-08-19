import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { PipesModule } from '../pipes.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [{
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'categorias',
        loadChildren: '../categorias/categorias.module#CategoriasPageModule'
      },
      {
        path: 'ordenes',
        loadChildren: '../ordenes/ordenes.module#OrdenesPageModule'
      },
      {
        path: 'buscar',
        loadChildren: '../buscador/buscador.module#BuscadorPageModule'
      },
      {
        path: 'usuario',
        loadChildren: '../usuario/usuario.module#UsuarioPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
