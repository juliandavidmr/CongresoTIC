import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Auth } from '../../providers/auth';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  constructor(
    public navCtrl: NavController,
    public auth: Auth
  ) {}

  ionViewDidLoad() {
    console.log('Hello Login Page');

    console.log('Auth: ', this.auth);    
  }

}
