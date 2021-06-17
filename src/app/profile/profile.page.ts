import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData = {}

  constructor(private UserService:UserService,
    private AlertController:AlertController,
    private NavController:NavController) { }

  ngOnInit() {
    this.UserService.getUserData().then(data => {
      this.setdata(data)
    })
  }

  setdata($data){
    this.userData = $data.User
  }

  async displayInfo() {
    const alert = await this.AlertController.create({
      header: 'Normas de convivencia',
      subHeader: 'Incumplir cualquiera de estas normas conllevará ser baneado permanentemente.',
      message: 'Utiliza un vocabulario adecuado siempre que vayas a escribir. No insultes a nadie a traves de esta aplicacion. No uses el boton de reportar a la ligera. No dudes en usar el boton de reportar si estas seguro.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async editUsername() {
    const alert = await this.AlertController.create({
      header: 'Editar nombre de usuario',
      subHeader: 'Nuevo nombre de usuario:',
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
            this.UserService.updateUserName(alertData.username)
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async editName() {
    const alert = await this.AlertController.create({
      header: 'Editar nombre',
      subHeader: 'Nuevo nombre:',
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
            this.UserService.updateName(alertData.username)
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async editSurname() {
    const alert = await this.AlertController.create({
      header: 'Editar apellido',
      subHeader: 'Nuevo apellido:',
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
            this.UserService.updateSurname(alertData.username)
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async changePass() {
    const alert = await this.AlertController.create({
      header: 'Editar contraseña',
      subHeader: 'Nueva contraseña:',
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
            this.UserService.updatePass(alertData.username)
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  logout(){
    this.NavController.navigateRoot('home')
  }

}
