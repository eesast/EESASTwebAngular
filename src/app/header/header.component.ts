import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/services/user.service';
import { User } from '../user/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  registerForm: FormGroup;
  currentUser: User;
  islogin: boolean;

  constructor(private userService:UserService, @Inject('baseURL') private baseURL) { 

  }

  ngOnInit() {
    this.userService.islogin.subscribe(res => {this.islogin = res; console.log(this.islogin)});
    this.userService.getCurrentUser.subscribe(res => {this.currentUser = res; console.log(this.currentUser)});
    this.userService.checkLoginToken();
  }

}
