import { Component } from '@angular/core';

import { NavController, AlertController, ToastController } from 'ionic-angular';
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
    public listStorage: DataStorage,
    public toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    // console.log("Moment: ", moment(new Date()));
    this.loadList();
  }

  loadList() {
    this.listStorage.getList().then((list: any = []) => {
      if (list) {
        this.list = list;
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

  presentToast(message: string, time: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: time,
      position: 'center'
    });
    toast.present();
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

        this.presentToast('Codigo leido correctamente', 3000);
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