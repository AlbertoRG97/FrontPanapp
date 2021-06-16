import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnRecipePage } from './own-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: OwnRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnRecipePageRoutingModule {}
