import { Component } from '@angular/core';

import { NavController, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

import { Asistencia } from '../../providers/asistencia';
import { Refrigerio } from '../../providers/refrigerio';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-lector',
  templateUrl: 'lector.html'
})
export class Lector {

  autenticado: boolean = false;
  isLogistica: boolean = false;
  user: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public api_asistencia: Asistencia,
    public api_refrigerio: Refrigerio,
    public auth: Auth
  ) { }

  ionViewDidLoad() {
    this.auth.getLogistica().then(isLogistica => {
      if (isLogistica === true && isLogistica) {
        this.isLogistica = isLogistica;

        this.auth.getData().then(value => {
          if (value.idUsuario && value.Username) {
            this.autenticado = true;

            this.user = value;

            console.log('Usuario autenticado: ', this.user);
          } else {
            this.autenticado = false;

            this.user = null;
          }
        }).catch(err => {

        });
      } else {
        this.showAlert('Rol invalido', 'Al parecer usted no es de logistica');
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
    if (this.isLogistica) {

      BarcodeScanner.scan().then((barcodedata) => {
        if (barcodedata.cancelled) {
          this.showAlert(
            'Cancelado',
            'Se ha cancelado la lectura de codigos de barras o Qr.'
          );
        } else {
          this.presentToast('Codigo leido correctamente, ' + JSON.stringify(barcodedata), 3000);

          var cedula = barcodedata.text;
          var id_usuario = this.user.idUsuario;

          this.api_asistencia.load(cedula, id_usuario).then(result => {
            this.showAlert(
              'Alerta',
              'Resultado: '.concat(JSON.stringify(result))
            );
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

    } else {
      this.showAlert(
        'Ha ocurrido un error al leer el codigo!',
        'No eres de logistica'
      );
    }
  }

  readBarcode_refrigerio() {
    if (this.isLogistica) {
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
          var id_usuario = this.user.idUsuario;

          this.api_refrigerio.load(cedula, id_usuario).then(result => {
            this.showAlert('Alerta', 'Mensaje: '.concat(JSON.stringify(result)));
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
    } else {
      this.showAlert(
        'Ha ocurrido un error al leer el codigo!',
        'No eres de logistica'
      );
    }
  }

}