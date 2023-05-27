import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingCalendarPageRoutingModule } from './booking-calendar-routing.module';

import { BookingCalendarPage } from './booking-calendar.page';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingCalendarPageRoutingModule, 
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ReactiveFormsModule
  ],
  declarations: [BookingCalendarPage],
  exports: [BookingCalendarPage]
})
export class BookingCalendarPageModule {}
