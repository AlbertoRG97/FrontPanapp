import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditHydrationPageRoutingModule } from './edit-hydration-routing.module';

import { EditHydrationPage } from './edit-hydration.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditHydrationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditHydrationPage]
})
export class EditHydrationPageModule {}
