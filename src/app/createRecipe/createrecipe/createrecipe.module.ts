import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaterecipePageRoutingModule } from './createrecipe-routing.module';

import { CreaterecipePage } from './createrecipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaterecipePageRoutingModule
  ],
  declarations: [CreaterecipePage]
})
export class CreaterecipePageModule {}
