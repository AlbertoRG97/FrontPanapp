import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  apiUrl = "http://recetas.allsites.es/public/api"

  constructor(private http:HttpClient,
    private LoginService:LoginServiceService) { }

  getArticles(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/articles',
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
      resolve(data);
      }, err => {
        console.log(err);
      });
      });
  }

  getArticle($id){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/articles/' + $id,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
      resolve(data);
      }, err => {
        console.log(err);
      });
      });
  }
  
}
