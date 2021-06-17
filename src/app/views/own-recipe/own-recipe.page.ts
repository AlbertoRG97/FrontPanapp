import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommentsService } from '../../services/comments.service';
import { LoginServiceService } from '../../services/login-service.service';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-own-recipe',
  templateUrl: './own-recipe.page.html',
  styleUrls: ['./own-recipe.page.scss'],
})
export class OwnRecipePage implements OnInit {

  id: any
  id_user: any
  username: any

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
    private LoginService:LoginServiceService,
    private alertController:AlertController,
    private NavController:NavController,
    private UserService:UserService) { }

  ngOnInit() {
    this.id_user = this.LoginService.userId
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
    this.UserService.getUserData().then(data => {
      this.setUsername(data)
    })
  }

  setUsername($data){
    this.username = $data.User.username
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

  async reportComment($id) {
    const alert = await this.alertController.create({
      header: 'Denunciar comentario',
      subHeader: '¿Desea denunciar el comentario?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Denunciar',
          handler: () => {
            this.CommentsService.reportComment($id).then(data => {
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

  async confirmComment($id) {
    const alert = await this.alertController.create({
      header: 'Comentario compartido con éxito',
      buttons: [
        {
          text: 'Continuar',
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

  setComment($event){
    this.comment = $event.detail.value
  }

  comentar(){
    this.myComment['recipe_id'] = this.id
    this.myComment['user_id'] = this.id_user
    this.myComment['username'] = this.username
    this.myComment['comment'] = this.comment
    this.CommentsService.createComment(this.myComment)
    this.comentConfirm()
  }

  editFlour(){
    this.NavController.navigateRoot('/edit-flour/'+this.id)
  }
  editHydra(){
    this.NavController.navigateRoot('/edit-hydration/'+this.id)
  }
  editOther(){
    this.NavController.navigateRoot('/edit-others/'+this.id)
  }
  editSteps(){
    this.NavController.navigateRoot('/edit-steps/'+this.id)
  }

  async editName() {
    const alert = await this.alertController.create({
      header: 'Editar nombre',
      subHeader: 'Nuevo nombre:',
      inputs: [
        {
          name: 'name',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Actualizar',
          handler: (alertData) => {
            this.RecipeService.editName(this.id,alertData.name)
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async comentConfirm() {
    const alert = await this.alertController.create({
      header: 'Comentario creado',
      subHeader: 'Refresca la pagina deslizando hacia abajo',
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async editDesc() {
    const alert = await this.alertController.create({
      header: 'Editar nombre',
      subHeader: 'Nuevo nombre:',
      inputs: [
        {
          name: 'description',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Actualizar',
          handler: (alertData) => {
            this.RecipeService.editDesc(this.id,alertData.description)
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  editImage($id){
    if(this.id_user == $id){
      this.NavController.navigateRoot('edit-image/'+this.id)
    }
    
  }
}
