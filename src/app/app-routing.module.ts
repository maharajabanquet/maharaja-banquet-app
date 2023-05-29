import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'calendar/:tab',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'tabs4',
    loadChildren: () => import('./tabs4/tabs4.module').then( m => m.Tabs4PageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category-page/category-page.module').then( m => m.CategoryPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'booking-calendar/:id',
    loadChildren: () => import('./booking-calendar/booking-calendar.module').then( m => m.BookingCalendarPageModule)
  },
  {
    path: 'media',
    loadChildren: () => import('./media/media.module').then( m => m.MediaPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
