import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

/*
  Inicio de sesion
*/
@Injectable()
export class Auth {

  data: any;
  private USER_DATA: string = 'USER_DATA';

  constructor(
    public http: Http,
    public storage: Storage) {

    console.log('Hello Auth Provider');
    //this.signout();
  }

  login(email: string, password: string) {
    var body = {
      "username": email,
      "contraseña": password
    }

    return new Promise((resolve, reject) => {
      this.http.post('http://200.21.7.94/congreso/api/usuario/select_usuario', body)
        .map(res => res.json())
        .subscribe(values => {
          this.data = values;

          if (values.result) {
            console.log('Data: ', values.data[0]);

            this.storage.set(this.USER_DATA, values.data[0]);

            resolve(this.data);
          } else {
            reject('Error de peticion.');
          }
        });
    });
  }

  getData() {
    return this.storage.get(this.USER_DATA);
  }

  signout() {
    this.storage.set(this.USER_DATA, undefined);
  }

  qr() {
    return new Promise((resolve, reject) => {
      this.http.post('http://200.21.7.94/congreso/api/usuario/select_usuario', {})
        .map(res => res.json())
        .subscribe(values => {
          this.data = values;

          if (values.result) {
            this.storage.set(this.USER_DATA, values.data);

            resolve(this.data);
          } else {
            reject('Error de peticion.');
          }
        });
    });
  }
}