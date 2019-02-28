import { CanLoad, Router, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { loginService } from "./login/login.service";

@Injectable()
export class LoggedinGuard implements CanLoad {

    constructor(
        private loginService: loginService
    ){}

    public canLoad(route: Route): boolean {

        const loggedin = this.loginService.isLoggedIn();

        if(!loggedin) {
            this.loginService.handleLogin(`/${route.path}`)
        }

        return loggedin;
    }
}