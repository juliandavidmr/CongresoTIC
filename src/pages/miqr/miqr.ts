import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Auth } from '../../providers/auth';

/*
  Generated class for the Miqr page.
*/
@Component({
  selector: 'page-miqr',
  templateUrl: 'miqr.html'
})
export class Miqr {

  public url_src: string = '';
  public title: string;
  public name: string;

  constructor(
    public navCtrl: NavController,
    public auth: Auth
  ) {}

  ionViewDidLoad() {
    console.log('Hello Miqr Page');

    this.auth.getData().then(value => {
      let url = 'http://200.21.7.94/congreso/Qr/' + (value.idPersona || value.FK_idPersona) + '.png';

      this.url_src = url;
      this.title = value.Correo;
      this.name = value.Nombres + ' ' + value.Apellidos;
    }).catch(err => {

    })
  }

}
