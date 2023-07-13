import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingModalPageRoutingModule } from './booking-modal-routing.module';

import { BookingModalPage } from './booking-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BookingModalPage]
})
export class BookingModalPageModule {}
