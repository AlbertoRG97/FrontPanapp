import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreaterecipePage } from './createrecipe.page';

const routes: Routes = [
  {
    path: '',
    component: CreaterecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaterecipePageRoutingModule {}
