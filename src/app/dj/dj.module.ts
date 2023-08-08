import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DjPageRoutingModule } from './dj-routing.module';

import { DjPage } from './dj.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DjPageRoutingModule
  ],
  declarations: [DjPage]
})
export class DjPageModule {}
