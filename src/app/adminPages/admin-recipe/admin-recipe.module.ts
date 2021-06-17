import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRecipePageRoutingModule } from './admin-recipe-routing.module';

import { AdminRecipePage } from './admin-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRecipePageRoutingModule
  ],
  declarations: [AdminRecipePage]
})
export class AdminRecipePageModule {}
