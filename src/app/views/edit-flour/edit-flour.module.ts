import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFlourPageRoutingModule } from './edit-flour-routing.module';

import { EditFlourPage } from './edit-flour.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFlourPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditFlourPage]
})
export class EditFlourPageModule {}
