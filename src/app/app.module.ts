import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule } from '@angular/http';

import { CarritoService, ProductosService, UsuarioService} from './index.services';

import { CarritoPage, CategoriasPage, HomePage, LoginPage, 
  OrdenesPage, OrdenesDetallePage, PorCategoriasPage, ProductoPage, TabsPage } from './index.paginas';
import { ImagenPipe } from './imagen.pipe';

import { HomePageModule } from './home/home.module';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpModule,
      IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CarritoService,
    ProductosService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
