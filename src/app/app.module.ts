import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { DataStorage } from '../providers/data-storage';
import { DataRegistrados } from '../providers/data-registrados';
import { Auth } from '../providers/auth';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Registrados } from '../pages/registrados/registrados';
import { QrVisor } from '../pages/qr-visor/qr-visor'
import { Login } from '../pages/login/login';
import { Evento } from '../pages/evento/evento';

import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Registrados,
    QrVisor,
    Login,
    Evento
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Registrados,
    QrVisor,
    Login,
    Evento
  ],
  providers: [
    [Storage],
    [DataStorage],
    [DataRegistrados],
    [Auth]
  ]
})
export class AppModule {}
