import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DjPage } from './dj.page';

const routes: Routes = [
  {
    path: '',
    component: DjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DjPageRoutingModule {}
