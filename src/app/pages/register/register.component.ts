import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  
  registerFormErrors = {
    'username':'',
    'password':'',
    'password2':'',
    'email':'',
    'studentID':'',
    'realname':''
  }

  registerValidationMessages = {
    'username':{  
      'required':'需要键入一个用户名'
    },
    'password':{
      'required':'需要键入密码'
    },
    'password2':{
      'required':'需要将密码重复一遍'
    },
    'email':{
      'required':'需要电子邮件'
    },
    'studentID':{
      'required':'需要学生证号'
    },
    'realname':{
      'required':'需要真实姓名'
    }
  }
  

  constructor(private fb: FormBuilder,
              private userService:UserService,
              @Inject('baseURL') private baseURL,
              private router: Router) { 
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  createRegisterForm(){
    this.registerForm = this.fb.group(
      {
        'username':['', [Validators.required] ],
        'password':['', [Validators.required] ],
        'password2': ['', [Validators.required] ],
        'studentID':['', [Validators.required] ],
        'email':['', [Validators.required] ],
        'realname':['', [Validators.required] ]
      }
    );

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data))

    this.onValueChanged();
  }

  onValueChanged(data? :any){
    console.log("value changed!");
    if(! this.registerForm) { return; }
    const form = this.registerForm;
    for (const field in this.registerFormErrors){
      this.registerFormErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid){
        const messages = this.registerValidationMessages[field];
        for (const key in control.errors){
          this.registerFormErrors[field] += messages[key] + ' ';
        }
      }
    }
    console.log(this.registerFormErrors);
  }

  registerSubmit(){
    let registerInfo = this.registerForm.value;
    this.userService.RegisterObservable(registerInfo).subscribe(
      res => {
        if (res){
          this.router.navigate(['main'])
        }
      }
    )
  }
}
