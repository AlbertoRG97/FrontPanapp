import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCreateArticlePageRoutingModule } from './admin-create-article-routing.module';

import { AdminCreateArticlePage } from './admin-create-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCreateArticlePageRoutingModule
  ],
  declarations: [AdminCreateArticlePage]
})
export class AdminCreateArticlePageModule {}
