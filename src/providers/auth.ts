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
  USER_DATA: string = 'USER_DATA';

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello Auth Provider');
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
    
  }
}
