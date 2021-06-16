import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOthersPage } from './edit-others.page';

const routes: Routes = [
  {
    path: '',
    component: EditOthersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOthersPageRoutingModule {}
