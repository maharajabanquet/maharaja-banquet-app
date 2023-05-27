import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingCalendarPage } from './booking-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: BookingCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingCalendarPageRoutingModule {}
