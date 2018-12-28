import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class WebserviceProvider {

  constructor(private http: Http, private loadingController: LoadingController) {
    console.log('Hello WebserviceProvider Provider');
  }

  callGet(page) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let load = this.loadingController.create({});
    load.present();

    return new Promise((resolve, reject) => {
      this.http.get('https://reqres.in/api/users?page=' + page, options).map(res => res.json()).subscribe((res) => {
        load.dismissAll();
        resolve(res);
      }, (err) => {
        load.dismissAll();
        reject(err);
      })
    })
  }
}
