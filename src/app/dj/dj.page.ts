import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dj',
  templateUrl: './dj.page.html',
  styleUrls: ['./dj.page.scss'],
})
export class DjPage implements OnInit {
  userDetails: any;
  segmentValue="pending"
  orders: any = [];
  constructor(
    private commonService: CommonService, 
    private alertController: AlertController,
    private toastr: ToastController
  ) { }

  ngOnInit() {
   this.userDetails = this.commonService.getUserDetails();
   this.getDjOrders();
  }

  getDjOrders() {
    this.commonService.getSpecificUser(this.userDetails.mobile).subscribe((resp: any) => {
      this.orders = resp && resp.user && resp.user.djOrder || [];
     })
  }
  public alertButtons = ['OK'];
  public alertInputs = [
   
    {
      placeholder: 'DJ Rate',
      attributes: {
        maxlength: 10,
      },
    },
   
   
  ];


  async presentAlertPrompt(order: any, i: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation!',
      inputs: [
        {
          name: 'quotes',
          type: 'number',
          placeholder: 'Enter Your Package Rate',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.orders[i].quotes = data.quotes;
            this.orders[i].status = 'Accepted'
            this.commonService.updateDjOrders(this.userDetails.mobile, this.orders).subscribe((resp: any) => {
              if(resp && resp.status === 'success'){
                this.toast('Order Accepted !!!');
                this.getDjOrders();
              }
            })
          },
        },
      ],
    });

    await alert.present();
  }

  async toast(msg) {
    const toast = await this.toastr.create({
      position: 'top',
      message: msg,
      duration: 3000
    });
    await toast.present();    
  }
  
  async handleReject(order: any, i: any) {
    const alert = await this.alertController.create({
      header: 'Are You Sure?',
      message: 'Are you sure, you want to reject this bookin?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Yes',
          handler: (data) => {
            this.orders[i].status = 'Rejected'
            this.commonService.updateDjOrders(this.userDetails.mobile, this.orders).subscribe((resp: any) => {
              if(resp && resp.status === 'success'){
                this.toast('Order Rejected !!!');
                this.getDjOrders();
              }
            })
          },
        },
      ],

    });

    await alert.present();
  }
}
