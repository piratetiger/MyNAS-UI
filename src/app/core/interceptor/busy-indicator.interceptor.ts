import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponseBase,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppService } from 'src/app/shared/services/app.service';

@Injectable()
export class BusyIndicatorInterceptor implements HttpInterceptor {
    constructor(private service: AppService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.service.increaseBusyIndicator();

        return next.handle(req).pipe(
            tap((evt) => {
                if (evt instanceof HttpResponseBase) {
                    this.service.decreaseBusyIndicator();
                }
            })
        );
    }
}
