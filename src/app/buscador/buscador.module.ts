import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuscadorPage } from './buscador.page';
import { PipesModule } from '../pipes.module';

const routes: Routes = [
  {
    path: '',
    component: BuscadorPage
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
  declarations: [BuscadorPage]
})
export class BuscadorPageModule {}
