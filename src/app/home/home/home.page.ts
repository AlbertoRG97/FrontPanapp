import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    private loginService: LoginServiceService) { } 

  ngOnInit() {
  }

  goToRegister(){
    this.navCtrl.navigateRoot('/register');
  }

  login(){
    this.loginService.login(this.data).then(data => {
      console.log(this.loginService.token);
      this.navCtrl.navigateRoot('/tabs');
    });
  }

  verPass(){
    this.tipo = 'text'
  }
  noVerPass(){
    this.tipo = 'password'
  }

}
