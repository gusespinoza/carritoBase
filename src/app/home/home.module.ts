import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { PipesModule } from '../pipes.module';
import { LoginPage } from '../login/login.page';
import { LoginPageModule } from '../login/login.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    LoginPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
  entryComponents: [LoginPage]
})
export class HomePageModule {}
