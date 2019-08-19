import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PorCategoriasPage } from './por-categorias.page';
import { PipesModule } from '../pipes.module';

const routes: Routes = [
  {
    path: '',
    component: PorCategoriasPage
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
  declarations: [PorCategoriasPage]
})
export class PorCategoriasPageModule {}
