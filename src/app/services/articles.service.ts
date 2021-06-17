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

  updateName($id, $property){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/articles/' + $id,
      {
        name: $property
      },
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
  updateCat($id,$property){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/articles/' + $id,
      {
        category: $property
      },
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
  updateText($id,$property){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/articles/' + $id,
      {
        text: $property
      },
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

  delete($id){
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/articles/' + $id,
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

  create($data){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/articles',
      {
        name: $data.name,
        text: $data.text,
        category: $data.category
      },
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
