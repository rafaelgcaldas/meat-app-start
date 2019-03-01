import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedinGuard implements CanLoad, CanActivate {

    constructor(
        private loginService: LoginService
    ){}

    public checkAuthentication(path: string): boolean {
        const loggedin = this.loginService.isLoggedIn();
        if(!loggedin) {
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedin;
    }

    public canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path)
    }

    public canActivate(activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activateRoute.routeConfig.path)
    }
}