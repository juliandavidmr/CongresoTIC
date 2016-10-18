import { Component } from '@angular/core';

import { NavController, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

import { Asistencia } from '../../providers/asistencia';
import { Refrigerio } from '../../providers/refrigerio';

@Component({
  selector: 'page-lector',
  templateUrl: 'lector.html'
})
export class Lector {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public api_asistencia: Asistencia,
    public api_refrigerio: Refrigerio
  ) { }

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
        this.presentToast('Codigo leido correctamente, ' + JSON.stringify(barcodedata), 3000);

        var cedula = barcodedata.text;

        this.api_asistencia.load(cedula).then(result => {
          this.showAlert('Registrado correctamente', 'Correcto.');
        }).catch(err => {
          this.showAlert('Error al registrar', 'No se registró');
        });
      }
    }), (err) => {
      console.log("Error: ", err);

      this.showAlert(
        'Ha ocurrido un error al leer el codigo!',
        JSON.stringify(err)
      );
    };
  }
  
  readBarcode_refrigerio() {
    console.log("Leyendo codigo para refrigerio");

    BarcodeScanner.scan().then((barcodedata) => {
      if (barcodedata.cancelled) {
        this.showAlert(
          'Cancelado',
          'Se ha cancelado la lectura de codigos de barras o Qr.'
        );
      } else {
        this.presentToast('Codigo leido correctamente, ' + JSON.stringify(barcodedata), 3000);

        var cedula = barcodedata.text;

        this.api_refrigerio.load(cedula).then(result => {
          this.showAlert('Refrigerio registrado correctamente', 'Correcto.');
        }).catch(err => {
          this.showAlert('Error al registrar el refrigerio', 'No se registró nada.');
        });
      }
    }), (err) => {
      console.log("Error: ", err);

      this.showAlert(
        'Ha ocurrido un error al leer el codigo para el refrigerio!',
        JSON.stringify(err)
      );
    };
  }

}