import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import * as store from 'store';
import { MessageModel } from '../../models/message-model';
import { UserModel } from '../../models/user-model';

@Injectable()
export class AppService implements CanActivate, CanActivateChild {
    public messages = new EventEmitter<MessageModel>();
    public showHeader = new EventEmitter<boolean>();
    public showFooter = new EventEmitter<boolean>();
    public busyIndicator = new EventEmitter<boolean>();

    public get userInfo(): UserModel {
        return store.get('loginInfo');
    }

    public set userInfo(value: UserModel) {
        store.set('loginInfo', value);
    }

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const loginInfo = this.userInfo;
        if (loginInfo) {
            if (route.data == null || route.data.role == null) {
                return true;
            } else {
                if (route.data.role && route.data.role.indexOf(loginInfo.role) > -1) {
                    return true;
                }
            }
        }

        this.router.navigate(['/login']);
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const loginInfo = this.userInfo;
        if (loginInfo) {
            if (childRoute.data == null || childRoute.data.role == null) {
                return true;
            } else {
                if (childRoute.data.role && childRoute.data.role.indexOf(loginInfo.role) > -1) {
                    return true;
                }
            }
        }

        this.router.navigate(['/login']);
        return false;
    }
}
