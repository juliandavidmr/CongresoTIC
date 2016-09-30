import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [
    [Storage]
  ]
})
export class Page1 {

  count: number = 0;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {

  }

  ionViewDidLoad() {
    this.storage.get('count').then((value: number) => {
      if (value || value === 0) {
        console.log("Count: ", value);

        this.count = value;
      } else {
        this.storage.set('count', 0);
      }
    });
  }

  showAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  readBarcode() {
    BarcodeScanner.scan().then((barcodedata) => {
      this.showAlert(
        'Codigo leido correctamente',
        JSON.stringify(barcodedata)
      );
    }), (err) => {
      console.log("Error: ", err);

      this.showAlert(
        'Ha ocurrido un error al leer el codigo!',
        JSON.stringify(err)
      );
    };
  }

}
