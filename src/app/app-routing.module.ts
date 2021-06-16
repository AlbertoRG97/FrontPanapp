import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./home/verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./home/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'article/:id',
    loadChildren: () => import('./article/article.module').then( m => m.ArticlePageModule)
  },
  {
    path: 'flours',
    loadChildren: () => import('./createRecipe/flours/flours.module').then( m => m.FloursPageModule)
  },
  {
    path: 'others',
    loadChildren: () => import('./createRecipe/others/others.module').then( m => m.OthersPageModule)
  },
  {
    path: 'steps',
    loadChildren: () => import('./createRecipe/steps/steps.module').then( m => m.StepsPageModule)
  },
  {
    path: 'createrecipe',
    loadChildren: () => import('./createRecipe/createrecipe/createrecipe.module').then( m => m.CreaterecipePageModule)
  },
  {
    path: 'select-image',
    loadChildren: () => import('./createRecipe/select-image/select-image.module').then( m => m.SelectImagePageModule)
  },
  {
    path: 'own-recipe/:id',
    loadChildren: () => import('./views/own-recipe/own-recipe.module').then( m => m.OwnRecipePageModule)
  },
  {
    path: 'edit-flour/:id',
    loadChildren: () => import('./views/edit-flour/edit-flour.module').then( m => m.EditFlourPageModule)
  },
  {
    path: 'edit-hydration/:id',
    loadChildren: () => import('./views/edit-hydration/edit-hydration.module').then( m => m.EditHydrationPageModule)
  },
  {
    path: 'edit-others/:id',
    loadChildren: () => import('./views/edit-others/edit-others.module').then( m => m.EditOthersPageModule)
  },
  {
    path: 'edit-steps/:id',
    loadChildren: () => import('./views/edit-steps/edit-steps.module').then( m => m.EditStepsPageModule)
  },
  {
    path: 'edit-image/:id',
    loadChildren: () => import('./views/edit-image/edit-image.module').then( m => m.EditImagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
