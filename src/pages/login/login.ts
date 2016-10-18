import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: { username?: string, password?: string } = {};
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    private alertCtrl: AlertController,
    public auth: Auth
  ) { }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      if (this.login.username && this.login.password) {
        // this.userData.login(this.login.username);
        this.auth.login(this.login.username, this.login.password).then((value) => {
          console.log('Logeado');

          this.navCtrl.push(TabsPage);
        }).catch(err => {
          console.log('Error ', err);

          this.presentAlert('No se pudo iniciar sesión', 'Tal vez tu nombre de usuario o contraseña es incorrecto');
        });
      } else {
        this.submitted = false;
      }
    } else {
      this.presentAlert('No se pudo iniciar sesión', 'Tal vez tu nombre de usuario o contraseña es incorrecto');
      this.submitted = false;
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  presentAlert(title: string, desc: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: desc,
      buttons: ['Ok']
    });
    alert.present();
  }

}