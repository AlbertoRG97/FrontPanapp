import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlePage } from '../../article/article.page';
import { ArticlesService } from '../../services/articles.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.page.html',
  styleUrls: ['./admin-article.page.scss'],
})
export class AdminArticlePage implements OnInit {

  id: any;

  articles = [];

  constructor(private route:ActivatedRoute,
    private ArticlesService:ArticlesService,
    private alertController:AlertController,
    private NavController:NavController) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.ArticlesService.getArticle(this.id).then(data => {
      this.setData(data);
    })
    console.log('hello')
  }

  setData($data){
    this.articles = $data.Article
    console.log(this.articles)
  }

  onChange($event){
    this.ArticlesService.updateText(this.id,$event.detail.value).then(data => {
      console.log(data)
    })
  }
  onChangeCat($event){
    this.ArticlesService.updateCat(this.id,$event.detail.value).then(data => {
          console.log(data)
        })
  }
  onChangeName($event){
    this.ArticlesService.updateName(this.id,$event.detail.value).then(data => {
      console.log(data)
    })
  }

  async update(){
    const alert = await this.alertController.create({
      header: 'Actualizado',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.NavController.navigateRoot('admin-articles')
          }
        }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async delete(){
    const alert = await this.alertController.create({
          header: '¿Eliminar articulo?',
          buttons: [
            {
              text: 'Cancel'
            },
            {
              text: 'Eliminar',
              handler: () => {
                this.ArticlesService.delete(this.id)
              }
            }]
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
  }
}
