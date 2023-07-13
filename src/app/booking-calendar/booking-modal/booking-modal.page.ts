import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.page.html',
  styleUrls: ['./booking-modal.page.scss'],
})
export class BookingModalPage implements OnInit {
  @Input() date : any;
  bookingForm : FormGroup
  isProgress: Boolean;
  error = {
    customerName: '',
    mobile: '',
    address: '',
    requirement: ''
  }
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastController,
    private commonService: CommonService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      requirement: ['', [Validators.required]],
      bookingDate: [this.date, [Validators.required]]
    })
    this.bookingForm.get('mobile').valueChanges.subscribe((value:any) => {
      console.log(value);
      if(value) {
        if(value.toString().length >= 12) {
        
          this.error.mobile = 'Only allowed 10 to 12 number';
        } else {
          this.error.mobile = '';
        }
      }
     
    })
  }

  submit() {
    this.isProgress = true;
    const payload = this.bookingForm.getRawValue();
    this.commonService.addPublicBooking(payload).subscribe((resp: any) => {
      if(resp && resp.status === 'ok') {
        this.toast('Your Booking Request has been submitted, Our Manager Will Contact You Soon...', 'secondary');
        this.isProgress = false;
        this.modal.dismiss();
      }
    }, (err) => {
      if(err && err.error && err.error.status === 'Validation Failed') {
        this.error = err && err.error;
        console.log(this.error);
        this.isProgress = false;
      }
      this.isProgress = false;
    })
  }


  async toast(msg, color) {
    const toast = await this.toastr.create({
      position: 'bottom',
      message: msg,
      duration: 3000,
      color: color
    });
    await toast.present();  
  }
}
