import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, ToastController } from '@ionic/angular';

import { DataService, Message } from '../services/data.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data = inject(DataService);
  userLogin: any;
  userBookingData: any;
  bookingDetails: any;
  blob!: Blob;
  pdfSrc: any;
  constructor( private commonService: CommonService, private router: Router, private toastr: ToastController) {
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
  
  openService() {
    this.router.navigate(['media'])
  }

  givePrint(){
    // window.open(environment.host + `api/v1/invoice/invoice?data=${JSON.stringify(this.bookingForm.getRawValue())}`, "_blank");
    // this.bookingService.generateInvoice(this.bookingForm.getRawValue()).subscribe(res => {
    //   this._snackBar.open('Invoice Generated!', 'OK',{duration: 1000});
    // })
    this.toast('Please wait, Downloading Invoice', 'secondary')
    this.commonService.generateInvoice(this.userBookingData).subscribe((data: any) => {

      this.blob = new Blob([data as BlobPart], {type: 'application/pdf'});
    
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      this.pdfSrc = downloadURL;
      link.href = downloadURL;
      link.download = `${this.userBookingData.firstName}`+ "_invoice.pdf";
      link.click();
      this.openBrowser()
      this.toast('Invoice downloaded', 'secondary')
    });
  }

  async toast(msg, color) {
    const toast = await this.toastr.create({
      position: 'top',
      message: msg,
      duration: 3000,
      color: color
    });
    await toast.present();  
  }
    openBrowser() {
        this.commonService.preview().subscribe((resp: any) => {
          window.open(resp.url);
        })
          
    
    }
}
