import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-flours',
  templateUrl: './flours.page.html',
  styleUrls: ['./flours.page.scss'],
})
export class FloursPage implements OnInit {

  progress = 0.2

  flours = {'harina_blanca_trigo':0,'harina_integral_trigo':0,'harina_blanca_espelta':0,
  'harina_integral_espelta':0,'harina_blanca_centeno':0,'harina_integral_centeno':0,'semola_trigo':0};

  ultGr = {'0':0,'1':0,'2':0,'3':0,'4':0,'5':0,'6':0}

  grTotal: number = 0

  constructor(private NavController:NavController,
    private RecipeService:RecipeService,
    public alertController:AlertController) {}

  ngOnInit() {
  }

  totalGramos($event){
    console.log($event)

    for(let i=0; i<=6; i++){
      let id = parseInt($event.path[0].name)
      if(id == i && this.ultGr[i] != 0){
        console.log('distinto 0 en ' + i)
        this.grTotal = this.grTotal - this.ultGr[i]
        if($event.detail.value == ""){
          this.grTotal = this.grTotal + 0
          this.ultGr[i] = 0
        }
        else{
          this.grTotal = this.grTotal + parseInt($event.detail.value)
          this.ultGr[i] = parseInt($event.detail.value)
        }
        
        break
      }
      else if(id == i && this.ultGr[i] === 0){
        console.log('es 0 en '+i)
        this.grTotal = this.grTotal + parseInt($event.detail.value)
        this.ultGr[i] = parseInt($event.detail.value)
        break
      } 
    }
    console.log(this.ultGr)
  }

  setFlours(){
    this.flours.harina_blanca_trigo = this.ultGr[0]
    this.flours.harina_integral_trigo = this.ultGr[1]
    this.flours.harina_blanca_espelta = this.ultGr[2]
    this.flours.harina_integral_espelta = this.ultGr[3]
    this.flours.harina_blanca_centeno = this.ultGr[4]
    this.flours.harina_integral_centeno	 = this.ultGr[5]
    this.flours.semola_trigo = this.ultGr[6]

    console.log(this.flours)
  }

  next(){

    if(this.grTotal == 0){
      this.displayNoData()
    }
    else{
      this.setFlours()
      this.RecipeService.setFlours(this.flours)
      this.NavController.navigateRoot('/others')
    }
    
  }

  async displayInfo() {
    const alert = await this.alertController.create({
      header: 'Información',
      subHeader: 'Posibles errores',
      message: 'Es importante rellenar al menos un campo, de lo contrario la creación de la receta se anulará al final',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async displayNoData() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Faltan datos',
      message: 'Es importante rellenar al menos un campo, de lo contrario la creación de la receta se anulará al final',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
