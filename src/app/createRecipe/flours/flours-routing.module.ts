import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloursPage } from './flours.page';

const routes: Routes = [
  {
    path: '',
    component: FloursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloursPageRoutingModule {}
