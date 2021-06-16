import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {

  grTotal = 0

  hrTotal = 0
 
  otTotal = 0

  Hydration = {'agua':0, 'leche':0}

  HydrationPer = {'agua':0, 'leche':0}

  Others = {'salt':0,'masa_madre':0,'levadura_seca':0,'manteca':0,'aceite_oliva':0,
  'grasa':0,'semillas':0,'pure_patata':0,'huevo':0,'levadura_fresca':0}

  OthersPer = {'salt':0,'masa_madre':0,'levadura_seca':0,'manteca':0,'aceite_oliva':0,
  'grasa':0,'semillas':0,'pure_patata':0,'huevo':0,'levadura_fresca':0}

  constructor(private RecipeService:RecipeService,
    private NavController:NavController,
    public alertController:AlertController) { }

  ngOnInit() {
    this.grTotal = this.grTotal + this.RecipeService.flours.harina_blanca_trigo 
    this.grTotal = this.grTotal + this.RecipeService.flours.harina_integral_trigo
    this.grTotal = this.grTotal + this.RecipeService.flours.harina_blanca_espelta
    this.grTotal = this.grTotal + this.RecipeService.flours.harina_integral_espelta
    this.grTotal = this.grTotal + this.RecipeService.flours.harina_blanca_centeno
    this.grTotal = this.grTotal + this.RecipeService.flours.harina_integral_centeno
    this.grTotal = this.grTotal + this.RecipeService.flours.semola_trigo
  }

  calcularPorcentaje($event){
    
    this.hrTotal = this.hrTotal - this.Hydration[$event.path[0].name]
    
    if($event.detail.value ==  ""){
      this.Hydration[$event.path[0].name] = 0
      this.HydrationPer[$event.path[0].name] = 0
    }
    else{
      this.Hydration[$event.path[0].name] = Math.round((parseInt($event.detail.value) * 100) / this.grTotal)
      this.HydrationPer[$event.path[0].name] = parseInt($event.detail.value)
    }

    this.hrTotal = this.hrTotal + this.Hydration[$event.path[0].name]
    
  }

  calcularPorcentajeO($event){

    this.otTotal = this.otTotal - this.Others[$event.path[0].name]

    if($event.detail.value ==  ""){
      this.Others[$event.path[0].name] = 0
      this.OthersPer[$event.path[0].name] = 0
    }
    else{
      this.Others[$event.path[0].name] = Math.round((parseInt($event.detail.value) * 100) / this.grTotal)
      this.OthersPer[$event.path[0].name] = parseInt($event.detail.value)
    }

    this.otTotal = this.otTotal + this.Others[$event.path[0].name]
  }

  next(){

    if(this.hrTotal == 0 || this.Others['salt'] == 0){
      this.displayNoDataH()
    }
    else{
      this.RecipeService.setHydration(this.HydrationPer)
      this.RecipeService.setOthers(this.OthersPer)
      this.NavController.navigateRoot('/steps')
    }
    
  }

  async displayInfo() {
    const alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Posibles errores',
      message: 'Es importante rellenar al menos un campo de cada tipo, es decir al menos una hidratación y al menos otro ingrediente, de lo contrario la creación de la receta se anulará al final',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async displayNoDataH() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Faltan datos',
      message: 'Es importante rellenar al menos un campo de hidratación o sal, de lo contrario la creación de la receta se anulará al final',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
