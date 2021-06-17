import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  data = {};

  tipo ="password"
  
  constructor(private navCtrl: NavController,
    private loginService: LoginServiceService,
    private AlertController:AlertController) { } 

  ngOnInit() {
  }

  goToRegister(){
    this.navCtrl.navigateRoot('/register');
  }

  login(){
    this.loginService.login(this.data).then(data => {
      this.navegar(data)
    });
  }

  verPass(){
    this.tipo = 'text'
  }
  noVerPass(){
    this.tipo = 'password'
  }

  navegar($data){
    if($data.success.admin === 1){
      this.navCtrl.navigateRoot('admin-articles')
    }
    else{
      this.navCtrl.navigateRoot('tabs')
    }
  }

  async resetPass() {
    const alert = await this.AlertController.create({
      header: 'Introduce tu email',
      inputs: [
        {
          name: 'username',
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
            this.loginService.resetPass(alertData.username)
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
