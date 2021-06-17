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

  getUsers(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/users',
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

  deleteUser($id){
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/users/' + $id,
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
        username: $name,
        tipo: 'otro'
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
        name: $name,
        tipo: 'otro'
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
        surname: $name,
        tipo: 'otro'
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
        password: $name,
        tipo: 'pass'
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
