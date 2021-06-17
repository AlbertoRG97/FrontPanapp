import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRecipePage } from './admin-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRecipePageRoutingModule {}
