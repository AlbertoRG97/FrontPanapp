import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFlourPage } from './edit-flour.page';

const routes: Routes = [
  {
    path: '',
    component: EditFlourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFlourPageRoutingModule {}
