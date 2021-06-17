import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {

  users: any

  constructor(private UserService:UserService,
    private NavController:NavController) { }

  ngOnInit() {
    this.UserService.getUsers().then(data => {
      this.setUsers(data)
    })
  }

  setUsers($data){
    this.users = $data.Users
  }

  segmentChanged(ev: any, $id) {
    console.log('Segment changed', ev, $id);
    this.UserService.deleteUser($id)
  }
  logout(){
    this.NavController.navigateRoot('home')
  }
}
