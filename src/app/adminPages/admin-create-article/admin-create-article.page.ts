import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin-create-article',
  templateUrl: './admin-create-article.page.html',
  styleUrls: ['./admin-create-article.page.scss'],
})
export class AdminCreateArticlePage implements OnInit {

  data = {'name':'','text':'','category':''}

  constructor(private ArticlesService:ArticlesService,
    private AlertController:AlertController,
    private NavController:NavController) { }

  ngOnInit() {
  }

  onChange($event){
    this.data['text'] = $event.detail.value
  }
  onChangeCat($event){
    this.data['category'] = $event.detail.value
  }
  onChangeName($event){
    this.data['name'] = $event.detail.value
  }

  crear(){
    this.ArticlesService.create(this.data).then(() => {
      this.showMessage()
    })
  }

  async showMessage(){
    const alert = await this.AlertController.create({
      header: 'Articulo creado con éxito',
      buttons: [
        {
          text: 'Ok',
          handler: () =>{
            this.NavController.navigateRoot('admin-articles')
          }
        }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
