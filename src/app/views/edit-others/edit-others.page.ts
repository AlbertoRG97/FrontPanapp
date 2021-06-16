import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-others',
  templateUrl: './edit-others.page.html',
  styleUrls: ['./edit-others.page.scss'],
})
export class EditOthersPage implements OnInit {

  id: any

  grTotal = 0

  otTotal = 0

  Others = {'salt':0,'masa_madre':0,'levadura_seca':0,'manteca':0,'aceite_oliva':0,
  'grasa':0,'semillas':0,'pure_patata':0,'huevo':0,'levadura_fresca':0}

  OthersPer = {'salt':0,'masa_madre':0,'levadura_seca':0,'manteca':0,'aceite_oliva':0,
  'grasa':0,'semillas':0,'pure_patata':0,'huevo':0,'levadura_fresca':0}

  constructor(private NavController:NavController,
    private RecipeService:RecipeService,
    private route:ActivatedRoute,
    private alertController:AlertController) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.RecipeService.getFlours(this.id).then(data => {
      this.setTotal(data)
    })
    this.RecipeService.getOthers(this.id).then(data => {
      this.setPer(data)
    })
  }

  setPer($data){
    this.OthersPer['salt'] = $data.Others.salt
    this.OthersPer['masa_madre'] = $data.Others.masa_madre
    this.OthersPer['levadura_seca'] = $data.Others.levadura_seca
    this.OthersPer['manteca'] = $data.Others.manteca
    this.OthersPer['aceite_oliva'] = $data.Others.aceite_oliva
    this.OthersPer['grasa'] = $data.Others.grasa
    this.OthersPer['semillas'] = $data.Others.semillas
    this.OthersPer['pure_patata'] = $data.Others.pure_patata
    this.OthersPer['huevo'] = $data.Others.huevo
    this.OthersPer['levadura_fresca'] = $data.Others.levadura_fresca
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

      this.RecipeService.setOthers(this.OthersPer)
      this.RecipeService.editOthers(this.id)
      this.NavController.navigateRoot('/tabs')
    
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
      subHeader: 'Faltan datos',
      message: 'Es importante rellenar al menos un campo de hidratación o sal, de lo contrario la creación de la receta se anulará al final',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
