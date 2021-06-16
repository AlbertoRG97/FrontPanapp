import { Component, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  id: any;

  articles = [];

  constructor(private route:ActivatedRoute,
    private ArticlesService:ArticlesService) { }

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

}
