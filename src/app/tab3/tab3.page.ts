import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  option: string;

  miniData: any

  articles: any

  constructor(private ArticlesService:ArticlesService,
    private NavController:NavController) {}

  ngOnInit(){
    this.ArticlesService.getArticles().then(data => {
      this.setData(data)
    })
  }

  cardClicked($id){
    this.NavController.navigateRoot('/article/' + $id)
  }

  setData($data){
    this.articles = $data.Articles
  }

  onChange($event){
    if($event.detail.value == "Sf"){
      this.ArticlesService.getArticles().then(data => {
        this.setData(data)
      })
    }
    else{
      this.ArticlesService.getArticles().then(data => {
      this.articles = this.filtrar(data, $event.detail.value)
    })
    }
    
  }

  filtrar(toSort: any, $category){
    return toSort.Articles.filter((element) => element.category == $category).sort((a,b)=>a.created_at.localeCompare(b.created_at));
  }

  doRefresh(event) {
    console.log('Begin async operation');
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
