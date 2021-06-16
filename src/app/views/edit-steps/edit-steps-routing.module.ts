import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditStepsPage } from './edit-steps.page';

const routes: Routes = [
  {
    path: '',
    component: EditStepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditStepsPageRoutingModule {}
