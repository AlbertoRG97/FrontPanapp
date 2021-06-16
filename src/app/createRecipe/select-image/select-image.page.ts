import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.page.html',
  styleUrls: ['./select-image.page.scss'],
})
export class SelectImagePage implements OnInit {

  items = [['imagen1', 'imagen2', 'imagen3',], ['imagen4', 'imagen5']]

  imagen = ''

  constructor(private NavController:NavController,
    private RecipeService:RecipeService) { }

  ngOnInit() {
  }

  selectImage($event){
    console.log($event)
    this.imagen = $event
    this.RecipeService.setImage(this.imagen)
    this.NavController.navigateRoot('/createrecipe')
  }

}
