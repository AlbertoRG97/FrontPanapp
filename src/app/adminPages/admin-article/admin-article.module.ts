import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminArticlePageRoutingModule } from './admin-article-routing.module';

import { AdminArticlePage } from './admin-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminArticlePageRoutingModule
  ],
  declarations: [AdminArticlePage]
})
export class AdminArticlePageModule {}
