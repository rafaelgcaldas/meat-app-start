import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

import { MEAT_API } from '../../app.api';
import { User } from './user.model';

@Injectable()
export class LoginService {

    public user: User;
    public lastUrl: string;

    constructor(
        private http: HttpClient,
        private router: Router
    ){
        this.router.events.filter(e => e instanceof NavigationEnd)
                          .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
    }

    public isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    public login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
                    .do(user => this.user = user)
    }

    public handleLogin(path: string = this.lastUrl) {
        this.router.navigate(["/login", btoa(path)]);
    }

    public logout() {
        this.user = undefined;
    }
}