import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
})
export class StepsPage implements OnInit {

  steps = {'step_1':'', 'step_2':'', 'step_3':'', 'step_4':'', 'step_5':'',
    'step_6':'', 'step_7':'', 'step_8':'', 'step_9':'', 'step_10':'',
    'step_11':'', 'step_12':'', 'step_13':'', 'step_14':'', 'step_15':'',
    'step_16':'', 'step_17':'', 'step_18':'', 'step_19':'', 'step_20':''}

  constructor(private RecipeService:RecipeService,
    private NavController:NavController,
    public alertController:AlertController) { }

  ngOnInit() {
  }

  setStep($event){
    this.steps[$event.path[0].name] = $event.detail.value
    console.log(this.steps)
  }

  next(){

    //Bucle for que recorra steps, guarda el primer valor en una variable y cpmprueba la sigueinte
    //guarda el nuevo valor y comprueba la siguiente, y asi sucesivamente
    //la idea es que si nuestra variable esta vacia y comprueba una rellena pete

    let last = this.steps['step_1']
    let go = true

    for(let i = 2; i <= 20; i++){
      let step = 'step_' + i
      console.log(step)
      if(last == "" && this.steps[step] != ""){ 
        go = false
        break
      }
      last = this.steps[step]
    }

    if(go == true && this.steps['step_1'] != ''){
      this.RecipeService.setSteps(this.steps)
      this.NavController.navigateRoot('/select-image')
    }
    else{
      this.displayNoDataH()
    }
    
  }

  async displayInfo() {
    const alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Posibles errores',
      message: 'Es importante no dejar campos vacíon entre un paso y otro, si esto ocurriese se preoducirá un error al crear la receta y se cancelará todo el proceso',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async displayNoDataH() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Rellena los campos en orden',
      message: 'Es importante rellenar los campos de manera ordenada, sin saltarte alguno, de lo contrario la creación de la receta se anulará al final',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
