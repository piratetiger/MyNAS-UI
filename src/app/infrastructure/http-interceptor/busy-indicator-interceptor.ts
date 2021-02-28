import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponseBase
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppService } from '../services/app.service/app.service';

@Injectable()
export class BusyIndicatorInterceptor implements HttpInterceptor {

    constructor(private appService: AppService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.appService.busyIndicator.emit(true);

        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponseBase) {
                    this.appService.busyIndicator.emit(false);
                }
            }));
    }
}
