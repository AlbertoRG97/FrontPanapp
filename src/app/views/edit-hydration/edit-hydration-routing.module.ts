import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditHydrationPage } from './edit-hydration.page';

const routes: Routes = [
  {
    path: '',
    component: EditHydrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditHydrationPageRoutingModule {}
