import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { RecipeService } from '../services/recipe.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  recipes: any

  publicar = true

  recipeBool = false

  comments: Array<{numero : number}> = []

  allComments: any

  constructor( private loginService: LoginServiceService,
    private navController: NavController,
    private RecipeService:RecipeService,
    private alertController:AlertController,
    private actionSheetController: ActionSheetController,
    private SocialSharing:SocialSharing,
    private CommentsService:CommentsService) 
    {
      this.comprobarRecetas()
    }

  ngOnInit() {
    if(this.loginService.token == null){
      this.navController.navigateRoot('/home');
    }
    else{
      
    }
    
  }

  comprobarRecetas(){
    this.RecipeService.getRecipes().then(data => {
      this.recipes = this.filtrarMisRecetas(data)
      if( this.recipes.length == 0){
        this.recipeBool = false
        console.log(this.recipeBool)
      }
      else{
        this.recipeBool = true
        this.CommentsService.getComments().then(data => {
          this.allComments = data
          this.setComments()
        })
      }
    })
  }

  filtrarMisRecetas(data: any){
    return data.Recipes.filter((element) => element.user_id == this.loginService.userId).sort((a,b)=>a.created_at.localeCompare(b.created_at))
  }

  addButton(){
    console.log('boton')
    this.navController.navigateRoot('/flours')
  }

  async displaySure($id) {
    const alert = await this.alertController.create({
      header: 'Compartir',
      subHeader: '¿Desea compartir su receta con el resto de la comunidad?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.publicar = false
          }
        },
        {
          text: 'Continuar',
          handler: () => {
            this.RecipeService.publicRecipe($id).then(data => {
              console.log(data)
            })
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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

  async share() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Compartir',
      buttons: [ {
        text: 'Share',
        icon: 'logo-whatsapp',
        handler: () => {
          this.shareWhatsapp()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  shareWhatsapp(){
    this.SocialSharing.shareViaTwitter('Hola mensaje desde ionic').then(() => {

    }).catch(e => {
      console.log(e)
    })
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
