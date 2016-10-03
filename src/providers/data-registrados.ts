import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as API from './config';

@Injectable()
export class DataRegistrados {

  data: any = [];

  constructor(public http: Http) {
    console.log('Hello DataRegistrados Provider');
  }

  load() {
    return new Promise((resolve, reject) => {
      this.http.get(API.URL)
        .map(res => res.json())
        .subscribe(values => {          
          this.data = values;

          resolve(this.data);
        });
    });
  }

}
