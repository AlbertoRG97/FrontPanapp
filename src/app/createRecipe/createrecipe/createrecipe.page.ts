import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { RecipeService } from '../../services/recipe.service';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-createrecipe',
  templateUrl: './createrecipe.page.html',
  styleUrls: ['./createrecipe.page.scss'],
})
export class CreaterecipePage implements OnInit {

  imagen = ''

  data = {'name':'', 'description':'','user_id':this.loginService.userId}

  constructor(private NavController:NavController,
    private RecipeService:RecipeService,
    private alertController:AlertController,
    private loginService:LoginServiceService) { }

  ngOnInit() {
    this.imagen = this.RecipeService.Image
  }

  setName($event){
    this.data['name'] = $event.detail.value
  }

  setDescription($event){
    this.data['description'] = $event.detail.value
  }

  create(){
    if(this.data['name'] == '' || this.data['description'] == ''){
      this.displayNoDataH()
    }
    else{
      this.RecipeService.setRecipe(this.data)
      this.RecipeService.createRecipe()
    }
  }

  async displayNoDataH() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Rellena los campos',
      message: 'Es importante rellenar todos los campos, sin saltarte ninguno, de lo contrario la creación de la receta se anulará al final',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
