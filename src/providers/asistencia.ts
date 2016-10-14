import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Asistencia provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Asistencia {

  data: any;

  constructor(public http: Http) {
    console.log('Hello Asistencia Provider');
  }

  load(cedula: string) {
    var body = {
      fk_idusuario: cedula
    }

    return new Promise((resolve, reject) => {
      this.http.post('http://200.21.7.94/congreso/api/asistencia/registrar_asistencia', body)
        .map(res => res.json())
        .subscribe(values => {
          this.data = values;        
          if(values.result) {
            resolve(this.data);
          } else {
            reject('Error de peticion.')
          }
        });
    });
  }
  // 
}
