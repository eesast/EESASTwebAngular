import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../model/user';
import { ProcessHttpmsgService } from '../../shared/process-httpmsg.service';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { baseURL } from '../../shared/config';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CookieService, CookieOptions } from 'ngx-cookie';

// for angular2 it is needed.
import 'rxjs/add/observable/of';



@Injectable()
export class UserService {

  currentUser: User;
  login: boolean;
  getCurrentUser: Subject<User> = new Subject();
  islogin: Subject<boolean> = new Subject();


  constructor(private http: HttpClient,
    private cookieService: CookieService) { 
    this.currentUser = new User();
    this.login = false;
  }

  getCookieOption():object {
    let date = new Date();
    return {
      'expires':new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000))
    }
  }

  Login(data: object): boolean {
    this.http.post(`${baseURL}/users/login/`,data).subscribe(
      data => {
        console.log(data);
        console.log(data['success']);
        if (data['success'] === true){
          let token = data['token']
          console.log(token)
          this.http.get(`${baseURL}/users/profile/`, {
            headers: new HttpHeaders().set('x-access-token', token)
          }).subscribe(
            data => {
              console.log(data);
              this.currentUser.setValue({
                'realname':data['realname'],
                'username':data['user']['username'],
                'email':data['email'],
                'token':token
              })
              this.cookieService.put('token',this.currentUser.token, this.getCookieOption());
              this.login = true;
              this.islogin.next(true);
              this.getCurrentUser.next(this.currentUser);
              //this.loginObservable()
              console.log(`now user is ${this.islogin}`);
              console.log(this.currentUser);
            }
          );
        }
        else{
          return false;
        }
      }
    )
    return true;
  }

  RegisterObservable(data: object): Observable<boolean>{
    return Observable.of(this.Register(data));
  }

  Register(data: object): boolean{
    if(this.login){
      return false;
    }
    else{
      this.http.post(`${baseURL}/users/register`, data).subscribe(
        data => { 
          console.log(data);
          return true;
        }
        ,err => {
          return false;
        }
      )
    }
  }

  LogOut(){
    this.islogin.next(false);
    this.currentUser = new User();
    this.getCurrentUser.next(this.currentUser);
  }
  isAdmin(): boolean{
    return false;
  }

  isLogin(): Observable<boolean>{

    return this.islogin;
  }

  getUser():Observable<User> {
    return this.getCurrentUser;
  }

  checkLoginToken(){
    let token = this.cookieService.get('token');
    console.log(token);
    if (token) {
      this.http.get(baseURL + '/users/profile/',{
        'headers':new HttpHeaders({
          'x-access-token':token
        })
      }).subscribe(
        (res) => {
          if (res && res['_id']){
            this.login = true;
            this.islogin.next(true);
            this.currentUser = new User(
              {
                'username':res['user']['username'],
                'email':res['email'],
                'realname':res['realname']
              }
            );
            this.getCurrentUser.next(this.currentUser);
          }    
          console.log(res);
        }
      );
    }
  }
  
}
