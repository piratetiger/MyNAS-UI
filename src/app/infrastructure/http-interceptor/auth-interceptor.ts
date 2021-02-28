import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';
import { AppService } from '../services/app.service/app.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private appService: AppService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userInfo: UserModel = this.appService.userInfo;
        let headers = req.headers;
        if (userInfo && userInfo.userName && userInfo.token) {
            headers = headers.set('x-login-token', userInfo.token)
                .set('x-login-user', userInfo.userName);
        }

        return next.handle(req.clone({ headers: headers })).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 || err.status === 403) {
                        this.appService.userInfo = null;
                        this.router.navigate(['/login']);
                    }
                    this.appService.busyIndicator.emit(false);
                }
                return throwError(err);
            }));
    }
}
