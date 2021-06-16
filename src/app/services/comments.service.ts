import { Injectable } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private LoginService:LoginServiceService,
    private http:HttpClient) { }

  apiUrl = "http://recetas.allsites.es/public/api"

  getComments(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/comments',
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

  getComment($id){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/comments/'+$id,
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

  reportComment($id){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/comments/'+$id,{
        user_id : this.LoginService.userId
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

  deleteComment($id){
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/comments/'+$id,
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

  createComment($data){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/comments',
      {
        recipe_id : $data['recipe_id'],
        user_id : $data['user_id'],
        username : $data['username'],
        comment : $data['comment']
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
