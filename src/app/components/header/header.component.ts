import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;
  @Input() direccion: string;

  constructor(private NavController:NavController) { }

  ngOnInit() {}

  perfil(){
    this.NavController.navigateRoot('/profile');
  }
  logout(){
    this.NavController.navigateRoot('home')
  }
}
