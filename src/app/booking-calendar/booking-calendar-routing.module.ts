import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingCalendarPage } from './booking-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: BookingCalendarPage
  },  {
    path: 'booking-modal',
    loadChildren: () => import('./booking-modal/booking-modal.module').then( m => m.BookingModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingCalendarPageRoutingModule {}
