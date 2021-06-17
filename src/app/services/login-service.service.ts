import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  //Guardamos una url genérica
  apiUrl = "http://recetas.allsites.es/public/api"

  //Guardamos el token del usuario para realizar acciones que requieran de autenticación (usar token.token)
  token: any;

  //Guardamos el id del usuario que servirá para ingresar datos a través de la api
  userId: any;

  //Guardamos el codigo de verificacion del usuario
  ver_code: any;

  //Guardamos el nombre del user
  name: any;

  //Guardamos el username
  username: any

  constructor(private http: HttpClient,
    private alertCtrl: AlertController) { }

  async presentAlertRegister() {
    let alert = await this.alertCtrl.create({
      header: 'Error\n',
      message: 'Por favor rellene correctamente el formulario, gracias.',
      buttons: ['Ok']
    });
    await alert.present();
  }

  async presentAlertLogin() {
    let alert = await this.alertCtrl.create({
      header: 'Error\n',
      message: 'El email o la contraseña son incorrectos, vuelve a intentarlo.',
      buttons: ['Ok']
    });
    await alert.present();
  }

  setVariablesLogin(data: any){
    this.token = data.success.token;
    this.userId = data.success.id;
    this.name = data.success.name;
    this.username = data.success.username;
  }

  setVariablesRegister(data: any){
    this.token = data.success.token;
    this.userId = data.success.id;
    this.name = data.success.username;
    this.ver_code = data.success.code;
  }

  login(data: any){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/login',
      {
        email: data.email,
        password: data.password
      })
      .subscribe(data => {
      this.setVariablesLogin(data);
      resolve(data);
      // this.navCtrl.navigateRoot('/tabs');
      }, err => {
      this.presentAlertLogin();
      });
      });
  }

  register(data: any) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/register',
      {
      name: data.name,
      surname: data.surname,
      username: data.username,
      email: data.email,
      password: data.password,
      c_password: data.c_password,
      country: data.country,
      image: data.image,
      })
      .subscribe(data => {
      this.setVariablesRegister(data);
      resolve(data);
      }, err => {
      this.presentAlertRegister();
      });
      });
  }

  resetPass($email){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/resetPass',
      {
        email: $email
      })
      .subscribe(data => {
      resolve(data);
      }, err => {
      });
      });
  }
}
