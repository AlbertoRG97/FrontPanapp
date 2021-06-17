import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminArticlesPage } from './admin-articles.page';

const routes: Routes = [
  {
    path: '',
    component: AdminArticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminArticlesPageRoutingModule {}
