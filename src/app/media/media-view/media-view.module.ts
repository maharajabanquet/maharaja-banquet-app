import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaViewPageRoutingModule } from './media-view-routing.module';

import { MediaViewPage } from './media-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaViewPageRoutingModule
  ],
  declarations: [MediaViewPage]
})
export class MediaViewPageModule {}
