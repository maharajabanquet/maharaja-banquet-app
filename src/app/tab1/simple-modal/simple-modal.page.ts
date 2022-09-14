import { Component, OnInit, Input } from '@angular/core';
import { CommonServiceService } from './../../common-service.service';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.page.html',
  styleUrls: ['./simple-modal.page.scss'],
})
export class SimpleModalPage implements OnInit {
@Input() booking : any;
isAdmin: boolean;
  constructor(
    private commonService: CommonServiceService,
  ) { }

  ngOnInit() {
    console.log('From Modal', this.booking);
    this.commonService.isAdmin.subscribe(isAdmin => {
      
      this.isAdmin = isAdmin;
      console.log("IS ADMIN: ", this.isAdmin);
    })
  }

  ChangeToogle(value) {
    if(value === 'pending') {
      return false;
    } else {
      return true
    }
  } 

  onToogle(event, booking) {
    let status: String;
    console.log(event.target.value);
    if(event.detail.checked) {
      status = 'approved';
    } else {
      status = 'pending'
    }

    this.commonService.confirmBooking(booking._id, status).subscribe((resp: any) => {
      if(resp.status === 'success') {
        if(event.detail.checked) {
          this.booking.status = 'approved'
        } else {
          this.booking.status = 'pending'

        }
      }
    }, (err) => {
      console.log("Internal server error, Please try again");
      
    })
  }

 
}
