import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MEAT_API } from '../../app.api';
import { User } from './user.model';

@Injectable()
export class loginService {

    user: User;

    constructor(
        private http: HttpClient
    ){}

    public isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    public login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
                    .do(user => this.user = user)
    }
}