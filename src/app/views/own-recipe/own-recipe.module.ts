import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnRecipePageRoutingModule } from './own-recipe-routing.module';

import { OwnRecipePage } from './own-recipe.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnRecipePageRoutingModule,
    ComponentsModule
  ],
  declarations: [OwnRecipePage]
})
export class OwnRecipePageModule {}
