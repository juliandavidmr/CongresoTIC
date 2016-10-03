import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataStorage {

  constructor(public storage: Storage) {
    console.log('Hello DataStorage Provider');

    this.getList().then(values => {
      if (!values) {
        this.storage.set('list', []);
      }
    })
  }

  add(identificacion: string) {
    this.getList().then((values: any = []) => {
      values.push({
        num: identificacion,
        date: (new Date()).toDateString()
      });

      this.storage.set('list', values);    
    });
  }

  getList() {
    return this.storage.get('list');
  }

}
