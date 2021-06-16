import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOthersPageRoutingModule } from './edit-others-routing.module';

import { EditOthersPage } from './edit-others.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOthersPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditOthersPage]
})
export class EditOthersPageModule {}
