import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdenesPage } from './ordenes.page';
import { LoginPage } from '../login/login.page';
import { LoginPageModule } from '../login/login.module';

const routes: Routes = [
  {
    path: '',
    component: OrdenesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdenesPage],
  entryComponents: [LoginPage]
})
export class OrdenesPageModule {}
