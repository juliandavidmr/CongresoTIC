import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { DataStorage } from '../providers/data-storage';
import { DataRegistrados } from '../providers/data-registrados';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Registrados } from '../pages/registrados/registrados';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Registrados
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Registrados
  ],
  providers: [
    [Storage],
    [DataStorage],
    [DataRegistrados]
  ]
})
export class AppModule {}
