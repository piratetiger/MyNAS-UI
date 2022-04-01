import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
    providedIn: 'root'
})
export class GuardService implements CanActivate, CanActivateChild {
    private user;

    constructor(private service: AppService, private router: Router) {
        service.refreshUserInfo$.subscribe(user => this.user = user);
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.user) {
            if (route.data == null || route.data.role == null) {
                return true;
            } else {
                if (route.data.role && route.data.role.indexOf(this.user.role) > -1) {
                    return true;
                }
            }
        }

        this.router.navigate(['/login']);
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.user) {
            if (childRoute.data == null || childRoute.data.role == null) {
                return true;
            } else {
                if (childRoute.data.role && childRoute.data.role.indexOf(this.user.role) > -1) {
                    return true;
                }
            }
        }

        this.router.navigate(['/login']);
        return false;
    }
}