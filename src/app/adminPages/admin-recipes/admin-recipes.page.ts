import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin-recipes',
  templateUrl: './admin-recipes.page.html',
  styleUrls: ['./admin-recipes.page.scss'],
})
export class AdminRecipesPage implements OnInit {

  recipes: any

  constructor(private RecipeService:RecipeService,
    private NavController:NavController) { }

  ngOnInit(){
    this.RecipeService.getRecipes().then(data => {
      this.recipes = this.filtrarMisRecetas(data)
    })
  }

  filtrarMisRecetas(data: any){
    return data.Recipes.filter((element) => element.reported > 0).sort((a,b)=>a.created_at.localeCompare(b.created_at)).reverse()
  }

  viewRecipe($id){
    this.NavController.navigateRoot('/admin-recipe/'+$id)
  }

  doRefresh(event) {
    console.log('Begin async operation');
    
    this.RecipeService.getRecipes().then(data => {
      this.recipes = this.filtrarMisRecetas(data)
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  logout(){
    this.NavController.navigateRoot('home')
  }
}
