import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-steps',
  templateUrl: './edit-steps.page.html',
  styleUrls: ['./edit-steps.page.scss'],
})
export class EditStepsPage implements OnInit {

  id: any

  steps = {'step_1':'', 'step_2':'', 'step_3':'', 'step_4':'', 'step_5':'',
    'step_6':'', 'step_7':'', 'step_8':'', 'step_9':'', 'step_10':'',
    'step_11':'', 'step_12':'', 'step_13':'', 'step_14':'', 'step_15':'',
    'step_16':'', 'step_17':'', 'step_18':'', 'step_19':'', 'step_20':''}

  constructor(private RecipeService:RecipeService,
    private NavController:NavController,
    public alertController:AlertController,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.RecipeService.getSteps(this.id).then(data => {
      this.setOld(data)
    })
  }

  setOld($data){
    this.steps['step_1'] = $data.Steps.step_1
    this.steps['step_2'] = $data.Steps.step_2
    this.steps['step_3'] = $data.Steps.step_3
    this.steps['step_4'] = $data.Steps.step_4
    this.steps['step_5'] = $data.Steps.step_5
    this.steps['step_6'] = $data.Steps.step_6
    this.steps['step_7'] = $data.Steps.step_7
    this.steps['step_8'] = $data.Steps.step_8
    this.steps['step_9'] = $data.Steps.step_9
    this.steps['step_10'] = $data.Steps.step_10
    this.steps['step_11'] = $data.Steps.step_11
    this.steps['step_12'] = $data.Steps.step_12
    this.steps['step_13'] = $data.Steps.step_13
    this.steps['step_14'] = $data.Steps.step_14
    this.steps['step_15'] = $data.Steps.step_15
    this.steps['step_16'] = $data.Steps.step_16
    this.steps['step_17'] = $data.Steps.step_17
    this.steps['step_18'] = $data.Steps.step_18
    this.steps['step_19'] = $data.Steps.step_19
    this.steps['step_20'] = $data.Steps.step_20
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
      this.RecipeService.editSteps(this.id)
      this.NavController.navigateRoot('/tabs')
    }
    else{
      this.displayNoDataH()
    }
    
  }

  async displayInfo() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'No te preocupes por tus datos anteriores, siguen guardados aunque aqui no se muestren',
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
