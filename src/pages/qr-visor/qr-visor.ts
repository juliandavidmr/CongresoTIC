import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-qr-visor',
  templateUrl: 'qr-visor.html'
})
export class QrVisor {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello QrVisor Page');
  }

}
