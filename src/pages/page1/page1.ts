import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {    
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
      this.showAlert('Codigo leido correctamente', JSON.stringify(barcodedata));
    }), (err) => {
      console.log("Error: ", err);
    };
  }

}
