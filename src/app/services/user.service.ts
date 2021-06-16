import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://recetas.allsites.es/public/api"

  constructor(private http:HttpClient,
    private LoginService:LoginServiceService) { }

  getUserData(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/users/' + this.LoginService.userId,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
      resolve(data);
      // this.navCtrl.navigateRoot('/tabs');
      }, err => {
        console.log(err);
      });
      });
  }

  updateUserName($name){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/users/' + this.LoginService.userId,
      {
        username: $name
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data);
        // this.navCtrl.navigateRoot('/tabs');
        }, err => {
          console.log(err);
        });
        });
  }

  updateName($name){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/users/' + this.LoginService.userId,
      {
        name: $name
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data);
        // this.navCtrl.navigateRoot('/tabs');
        }, err => {
          console.log(err);
        });
        });
  }

  updateSurname($name){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/users/' + this.LoginService.userId,
      {
        surname: $name
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data);
        // this.navCtrl.navigateRoot('/tabs');
        }, err => {
          console.log(err);
        });
        });
  }

  updatePass($name){
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/users/' + this.LoginService.userId,
      {
        password: $name
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.LoginService.token),
      })
      .subscribe(data => {
        resolve(data);
        // this.navCtrl.navigateRoot('/tabs');
        }, err => {
          console.log(err);
        });
        });
  }
}
