import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { RecipeService } from '../services/recipe.service';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  recipes: any

  comments: Array<{numero : number}> = []

  allComments: any

  mostrarReport: boolean = true

  constructor(private navController:NavController,
    private RecipeService:RecipeService,
    private CommentsService:CommentsService,
    private alertController:AlertController) {}

  ngOnInit(){
    this.RecipeService.getRecipes().then(data => {
      this.recipes = this.filtrarMisRecetas(data)
      this.CommentsService.getComments().then(data => {
      this.allComments = data
      this.setComments()
    })
    })
    
    
  }

  filtrarMisRecetas(data: any){
    return data.Recipes.filter((element) => element.public == 1).sort((a,b)=>a.created_at.localeCompare(b.created_at))
  }

  viewRecipe($id){
    this.navController.navigateRoot('/own-recipe/'+$id)
  }

  setComments(){

    let count = 0

    this.recipes.forEach(element => {
      element['numero'] = parseInt(this.filtrarComments(this.allComments, element.id))
    });

    console.log(this.comments)
  }

  filtrarComments(data: any, $id){
    return data.Comments.filter((element) => element.recipe_id == $id).length
  }

  reportRecipe($id){
    this.RecipeService.reportRecipe($id).then(() => {
      this.mostrarReport = false
      this.alertReport()
    })
  }

  async alertReport() {
    const alert = await this.alertController.create({
      header: 'Denuncia completada',
      subHeader: 'Ahora un administrador revisará esta receta',
      buttons: [
        {
          text: 'Ok',
        },
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    
    this.RecipeService.getRecipes().then(data => {
      this.recipes = this.filtrarMisRecetas(data)
    })
    this.CommentsService.getComments().then(data => {
      this.allComments = data
      this.setComments()
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onChange($event){
    if($event.detail.value == "Sf"){
      this.RecipeService.getRecipes().then(data => {
        this.recipes = this.filtrarMisRecetas(data)
      })
    }
    else{
      switch($event.detail.value){
        case 'News':
          this.RecipeService.getRecipes().then(data => {
            this.recipes = this.newsFilter(this.filtrarMisRecetas(data))
            this.CommentsService.getComments().then(data => {
              this.allComments = data
              this.setComments()
            })
          })
          break;
        case 'Comments':
          this.RecipeService.getRecipes().then(data => {
            this.recipes = this.filtrarMisRecetas(data)
            this.CommentsService.getComments().then(data => {
              this.allComments = data
              this.setComments()
              this.recipes = this.commentFilter()
            })
          })
          break;
        case 'Nr':
          this.RecipeService.getRecipes().then(data => {
            this.recipes = this.noReportFilter(this.filtrarMisRecetas(data))
            this.CommentsService.getComments().then(data => {
              this.allComments = data
              this.setComments()
            })
            
          })
          break;
        case 'OrA':
          this.RecipeService.getRecipes().then(data => {
            this.recipes = this.ordenAFilter(this.filtrarMisRecetas(data))
            this.CommentsService.getComments().then(data => {
              this.allComments = data
              this.setComments()
            })
          })
          break;
      }
    }
  }

  newsFilter($data){
    return $data.sort((a,b)=>a.created_at.localeCompare(b.created_at)).reverse()
  }
  commentFilter(){
    return this.recipes.sort(function(a,b){
      if(a.numero > b.numero){
        return -1
      }
      if(a.numero < b.numero){
        return 1
      }
      return 0
    })
  }
  noReportFilter($data){
    return $data.filter((element) => element.reported == 0).sort((a,b)=>a.created_at.localeCompare(b.created_at)).reverse()
  }
  ordenAFilter($data){
    return $data.sort(function(a,b){
      if(a.name > b.name){
        return 1
      }
      if(a.name < b.name){
        return -1
      }
      return 0
    })
  }
}
