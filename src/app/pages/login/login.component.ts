import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitting: boolean;
  loginErr: boolean;

  constructor(private fb: FormBuilder, 
              private userService:UserService,
              private router: Router,
              @Inject('baseURL') private baseURL) {
    this.submitting = false;
  }

  ngOnInit() {
    this.createLoginForm();
    this.loginErr = false;
  }

  createLoginForm(){
    this.loginForm = this.fb.group(
      {
        'username':['', Validators.required],
        'password':['', Validators.required]
      }
    );
  }

  loginSubmit(){
    this.submitting = true;
    this.userService.islogin.subscribe(res => {
      if (res){
        this.submitting = false;
        this.router.navigate(['main']);
      }
      else{
        this.submitting = false;
        this.loginErr = true;
      }
    });
    this.userService.Login(this.loginForm.value);
  }


}
