import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCreateArticlePage } from './admin-create-article.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCreateArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCreateArticlePageRoutingModule {}
