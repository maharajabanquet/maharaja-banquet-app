import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaPage } from './media.page';

const routes: Routes = [
  {
    path: '',
    component: MediaPage
  },
  {
    path: 'media-view',
    loadChildren: () => import('./media-view/media-view.module').then( m => m.MediaViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaPageRoutingModule {}
