import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-hydration',
  templateUrl: './edit-hydration.page.html',
  styleUrls: ['./edit-hydration.page.scss'],
})
export class EditHydrationPage implements OnInit {

  id: any

  grTotal = 0

  hrTotal = 0

  Hydration = {'agua':0, 'leche':0}

  HydrationPer = {'agua':0, 'leche':0}

  constructor(private RecipeService:RecipeService,
    private NavController:NavController,
    private route:ActivatedRoute,
    private alertController:AlertController) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.RecipeService.getFlours(this.id).then(data => {
      this.setTotal(data)
    })
    this.RecipeService.getHydration(this.id).then(data => {
      this.setPer(data)
    })
  }

  setPer($data){
    this.HydrationPer['agua'] = $data.Hydration.agua
    this.HydrationPer['leche'] = $data.Hydration.leche
  }

  setTotal($data){
    this.grTotal = this.grTotal + $data.Flour.harina_blanca_trigo 
    this.grTotal = this.grTotal + $data.Flour.harina_integral_trigo
    this.grTotal = this.grTotal + $data.Flour.harina_blanca_espelta
    this.grTotal = this.grTotal + $data.Flour.harina_integral_espelta
    this.grTotal = this.grTotal + $data.Flour.harina_blanca_centeno
    this.grTotal = this.grTotal + $data.Flour.harina_integral_centeno
    this.grTotal = this.grTotal + $data.Flour.semola_trigo
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

  next(){

    if(this.hrTotal == 0){
      this.displayNoDataH()
    }
    else{
      this.RecipeService.setHydration(this.HydrationPer)
      this.RecipeService.editHydration(this.id)
      this.NavController.navigateRoot('/tabs')
    }
    
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

}
