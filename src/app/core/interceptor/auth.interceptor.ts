import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user-model';
import { AppService } from 'src/app/shared/services/app.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private user: UserModel;

    constructor(private router: Router, private service: AppService) {
        this.service.refreshUserInfo$.subscribe((user) => {
            this.user = user;
        });
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let headers = req.headers;
        if (this.user?.userName && this.user?.token) {
            headers = headers
                .set('x-login-token', this.user.token)
                .set('x-login-user', this.user.userName);
        }

        return next.handle(req.clone({ headers: headers })).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 || err.status === 403) {
                        this.service.refreshUserInfo(null);
                        this.router.navigate(['/login']);
                    }
                    this.service.busyIndicator.emit(false);
                }
                return throwError(err);
            })
        );
    }
}
