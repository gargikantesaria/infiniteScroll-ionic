import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  displayItems: any = [];
  currentPage = 1;
  totalPage = 0;
  totalData = 0;
  perPageData = 0;

  constructor(public navCtrl: NavController, private webService: WebserviceProvider) {
    this.webService.callGet(this.currentPage).then((data: any) => {

      this.currentPage = data.page;
      this.totalPage = data.total_pages;
      this.perPageData = data.per_page;
      this.totalData = data.total;
      this.displayItems = data.data;

    }).catch(() => {
      alert("Error in loadind data.")
    })
  }

  scrollInfinite(event) {
    this.currentPage += 1;
    setTimeout(() => {
      this.webService.callGet(this.currentPage).then((data: any) => {

        this.totalPage = data.total_pages;
        this.perPageData = data.per_page;
        this.totalData = data.total;

        for (let i = 0; i < data.data.length; i++) {
          this.displayItems.push(data.data[i]);
        }

        // To complete scrolling event
        event.complete();
      }).catch(() => {
        alert("Error in loadind data.")
        event.complete();
      })
    }, 1000);
  }

}
