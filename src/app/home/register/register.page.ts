import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  data = {'image':'favicon.png'};

  countries = ["Argentina","Bolivia","Chile","Colombia","Costa Rica","Cuba","Dominican Republic"
,"Ecuador","El Salvador","Equatorial Guinea","Guatemala","Honduras","Mexico","Nicaragua","Panama","Paraguay","Peru"
,"Puerto Rico","España","Uruguay","Venezuela"];

  tipo = 'password'

  constructor(private LoginService: LoginServiceService,
    private NavController: NavController) { }

  ngOnInit() {
  }

  register(){
    console.log(this.data)
    this.LoginService.register(this.data).then(data => {
      this.NavController.navigateRoot('/verify');
    })
  }

  verPass(){
    this.tipo = 'text'
  }
  noVerPass(){
    this.tipo = 'password'
  }
}
