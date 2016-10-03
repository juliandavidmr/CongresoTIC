import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataRegistrados } from '../../providers/data-registrados';

@Component({
  selector: 'page-registrados',
  templateUrl: 'registrados.html'
})
export class Registrados {

  list: any = [];

  constructor(
    public navCtrl: NavController,
    public registrados: DataRegistrados
  ) {}

  ionViewDidLoad() {
    console.log('Hello Registrados Page');

    this.registrados.load().then(values => {
      this.list = values;
    }), (err) => {
      console.log('Error: ', err);      
    };
  }

}
