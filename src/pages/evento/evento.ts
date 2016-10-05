import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Evento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html'
})
export class Evento {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Evento Page');
  }

}
