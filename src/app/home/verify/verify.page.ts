import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  code = ''

  constructor(private NavController:NavController,
    private LoginService:LoginServiceService,
    private alertCtrl:AlertController) { }

    async presentAlertOk() {
      let alert = await this.alertCtrl.create({
        header: 'Enhorabuena!\n',
        subHeader: 'La verificación ha sido un éxito.',
        message: 'Ya puedes disfrutar de tu aplicación panadera y todas sus funciones.',
        buttons: ['Adelante Centeno']
      });
      await alert.present();
    }
  
    async presentAlertFail() {
      let alert = await this.alertCtrl.create({
        header: 'Error\n',
        message: 'El código de verificación introducido es incorrecto, por favor inténtelo de nuevo.',
        buttons: ['Ok']
      });
      await alert.present();
    }

  ngOnInit() {
  }

  verificar(){
    if(this.code == this.LoginService.ver_code){
      this.presentAlertOk()
      this.NavController.navigateRoot('/tabs')
    }
    else{
      this.presentAlertFail();
    }
  }

}
