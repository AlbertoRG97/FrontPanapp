import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommentsService } from '../../services/comments.service';
import { LoginServiceService } from '../../services/login-service.service';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.page.html',
  styleUrls: ['./admin-recipe.page.scss'],
})
export class AdminRecipePage implements OnInit {

  id: any

  recipe = []
  flours = []
  hydrations = []
  others = []
  steps = []

  comments: any

  comment: any

  myComment = {'recipe_id':0,'user_id':0,'username':'','comment':''}

  constructor(private route:ActivatedRoute,
    private RecipeService:RecipeService,
    private CommentsService:CommentsService,
    private alertController:AlertController,
    private NavController:NavController,) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.RecipeService.getRecipe(this.id).then(data => {
      this.setData(data)
    })
    this.RecipeService.getFlours(this.id).then(data => {
      this.setF(data)
    })
    this.RecipeService.getHydration(this.id).then(data => {
      this.setH(data)
    })
    this.RecipeService.getOthers(this.id).then(data => {
      this.setO(data)
    })
    this.RecipeService.getSteps(this.id).then(data => {
      this.setS(data)
    })
    this.CommentsService.getComments().then(data => {
      this.comments = this.filtrarComments(data)
    })
  }

  setData($data){
    this.recipe = $data.Recipe
    console.log(this.recipe)
  }
  setH($data){
    this.hydrations = $data.Hydration
    console.log(this.hydrations)
  }
  setF($data){
    this.flours = $data.Flour
    console.log(this.flours)
  }
  setO($data){
    this.others = $data.Others
    console.log(this.others)
  }
  setS($data){
    this.steps = $data.Steps
    console.log(this.steps)
  }

  filtrarComments(data: any){
    return data.Comments.filter((element) => element.recipe_id == this.id).sort((a,b)=>a.created_at.localeCompare(b.created_at))
  }

  async deleteComment($id) {
    const alert = await this.alertController.create({
      header: 'Borrar',
      subHeader: '¿Desea borrar su comentario de esta receta?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Borrar',
          handler: () => {
            this.CommentsService.deleteComment($id).then(data => {
              console.log(data)
            })
            this.CommentsService.getComments().then(data => {
              this.comments = this.filtrarComments(data)
            })
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async deleteRecipe() {
    const alert = await this.alertController.create({
      header: 'Borrar',
      subHeader: '¿Desea borrar esta receta?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Borrar',
          handler: () => {
            this.RecipeService.deleteRecipe(this.id).then(data => {
              console.log(data)
            })
            this.NavController.navigateRoot('admin-recipes')
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  doRefresh($event){
    setTimeout(() => {
      this.CommentsService.getComments().then(data => {
        this.comments = this.filtrarComments(data)
      })
      this.RecipeService.getRecipe(this.id).then(data => {
        this.setData(data)
      })
      this.RecipeService.getFlours(this.id).then(data => {
        this.setF(data)
      })
      this.RecipeService.getHydration(this.id).then(data => {
        this.setH(data)
      })
      this.RecipeService.getOthers(this.id).then(data => {
        this.setO(data)
      })
      this.RecipeService.getSteps(this.id).then(data => {
        this.setS(data)
      })
      console.log('Async operation has ended');
      $event.target.complete();
    }, 2000);
  }
  

}
