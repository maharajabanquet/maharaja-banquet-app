import { ModalController, LoadingController, ViewWillEnter } from '@ionic/angular';
import { CommonServiceService } from './../common-service.service';
import { Component, Input } from '@angular/core';
import { SimpleModalPage } from '../tab1/simple-modal/simple-modal.page';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements ViewWillEnter {
  @Input() status: any = 'approved'
  bookingData: any = [];
  constructor(
    private bookingService: CommonServiceService,
    public modalController: ModalController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getBooking();
  }

  getBooking() {
    this.presentLoading().then(a => console.log('presented'));

    this.bookingService.getAllBooking(this.status).subscribe((resp: any) => {
      console.log(resp);
      this.bookingData = resp && resp.bookingData || [];
      this.loadingController.dismiss().then(a => console.log('dismissed'));

    })
  }

  onToogle(event, booking) {
    console.log(booking);
    
    let status: String;
    console.log(event.target.value);
    if(event.detail.checked) {
      status = 'approved';
    } else {
      status = 'pending'
    }

    this.bookingService.confirmBooking(booking._id, status).subscribe((resp: any) => {
      if(resp.status === 'success') {
        this.getBooking();
      }
    }, (err) => {
      console.log("Internal server error, Please try again");
      
    })
    
  }

  ChangeToogle(value) {
    if(value === 'pending') {
      return false;
    } else {
      return true
    }
  } 
 
  async presentModal(booking) {
    console.log("form main" , booking);
    
    const modal = await this.modalController.create({
      component: SimpleModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      componentProps: {
        booking: booking
      }
    });
    modal.onDidDismiss().then(() => {
      this.getBooking();
    })
    await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'please wait. . .',
      duration: 5000
    });
    return await loading.present();
  }
}