import { Component, inject } from '@angular/core';
import { Platform, RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data = inject(DataService);
  userLogin: any;
  userBookingData: any;
  constructor(private platform: Platform, private commonService: CommonService) {
    this.userLogin = JSON.parse(localStorage.getItem('user'))
    this.getBookingDetails();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  exit() {
    navigator['app'].exitApp();
  }

  getBookingDetails() {
    this.commonService.getUserBookingDetails(this.userLogin.mobile).subscribe((res: any) => {
      if(res) {
        this.userBookingData = res && res.data;
        console.log(this.userBookingData);
        
      }
    })
  }
}
