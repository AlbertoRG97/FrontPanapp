import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditStepsPageRoutingModule } from './edit-steps-routing.module';

import { EditStepsPage } from './edit-steps.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditStepsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditStepsPage]
})
export class EditStepsPageModule {}
