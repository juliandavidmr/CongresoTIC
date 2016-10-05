import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import * as moment from 'moment';

import { BarcodeScanner } from 'ionic-native';

import { DataStorage } from '../../providers/data-storage';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  list: any = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public listStorage: DataStorage
  ) {

  }

  ionViewDidLoad() {
    // console.log("Moment: ", moment(new Date()));

    this.loadList();
  }

  loadList() {
    this.listStorage.getList().then((list: any = []) => {
      if (list) {
        this.list = list;
      }

      var a = 10;
      while (a-- > 0) {
        this.list.push({
          num: Math.random() * 1000000000,
          date: new Date()
        });
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
    console.log("Leyendo codigo");

    BarcodeScanner.scan().then((barcodedata) => {
      if (barcodedata.cancelled) {
        this.showAlert(
          'Cancelado',
          'Se ha cancelado la lectura de codigos de barras o Qr.'
        );
      } else {
        this.listStorage.add(barcodedata);
        this.loadList();

        this.showAlert(
          'Codigo leido correctamente',
          JSON.stringify(barcodedata)
        );
      }
    }), (err) => {
      console.log("Error: ", err);

      this.showAlert(
        'Ha ocurrido un error al leer el codigo!',
        JSON.stringify(err)
      );
    };
  }

}