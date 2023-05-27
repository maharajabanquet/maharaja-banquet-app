import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tabs4PageRoutingModule } from './tabs4-routing.module';

import { Tabs4Page } from './tabs4.page';
import { HomePage } from '../home/home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tabs4PageRoutingModule
  ],
  declarations: [Tabs4Page, HomePage]
})
export class Tabs4PageModule {}
