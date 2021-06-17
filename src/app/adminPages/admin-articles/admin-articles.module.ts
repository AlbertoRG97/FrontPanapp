import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminArticlesPageRoutingModule } from './admin-articles-routing.module';

import { AdminArticlesPage } from './admin-articles.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminArticlesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminArticlesPage]
})
export class AdminArticlesPageModule {}
