import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.page.html',
  styleUrls: ['./edit-image.page.scss'],
})
export class EditImagePage implements OnInit {

  items = [['imagen1', 'imagen2', 'imagen3',], ['imagen4', 'imagen5']]

  id: any

  imagen = ''

  constructor(private NavController:NavController,
    private RecipeService:RecipeService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  selectImage($event){
    console.log($event)
    this.imagen = $event
    this.RecipeService.editImage(this.id,this.imagen)
    this.NavController.navigateRoot('/tabs')
  }
}
