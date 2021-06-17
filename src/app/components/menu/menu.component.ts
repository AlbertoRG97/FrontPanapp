import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu:MenuController,
    private NavController:NavController) { }

  ngOnInit() {
    
  }
  openFirst(){
    this.menu.enable(true, 'first')
    this.menu.open('first')
  }

  goArticles(){
    this.NavController.navigateRoot('admin-articles')
  }
  goUsers(){
    this.NavController.navigateRoot('admin-users')
  }
  goRecipes(){
    this.NavController.navigateRoot('admin-recipes')
  }
}
