import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FloursPageRoutingModule } from './flours-routing.module';

import { FloursPage } from './flours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FloursPageRoutingModule
  ],
  declarations: [FloursPage]
})
export class FloursPageModule {}
