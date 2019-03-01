import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/security/login/login.service';
import { User } from 'app/security/login/user.model';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  public user(): User {
    return this.loginService.user;
  }

  public isLoggedin(): boolean {
    return this.loginService.isLoggedIn();
  }

  public login(){
    this.loginService.handleLogin();
  }

  public logout() {
    this.loginService.logout();     
  }
}
