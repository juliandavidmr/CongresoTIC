import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Refrigerio {

  data: any;

  constructor(public http: Http) {
    console.log('Hello Refrigerio Provider');
  }

  load(cedula: string, id_usuario: string) {
    var body = {
      fk_idusuario: cedula,
      userid: id_usuario
    }

    return new Promise((resolve, reject) => {
      this.http.post('http://200.21.7.94/congreso/api/refrigerio/registrar_refrigerio', body)
        .map(res => res.json())
        .subscribe(values => {
          this.data = values;
          
          resolve(this.data);
        });
    })
  }
}
