import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataResult } from 'src/app/shared/models/data-result';
import { MessageModel, MessageType } from 'src/app/shared/models/message-model';
import { AppService } from 'src/app/shared/services/app.service/app.service';

@Injectable()
export class MessageInterceptor implements HttpInterceptor {

    constructor(private appService: AppService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    const body: DataResult<any> = evt.body;
                    if (body.messageResult) {
                        const message = new MessageModel();
                        message.type = MessageType[body.messageType];
                        message.message = body.message;
                        this.appService.messages.emit(message);
                    }
                }
            }));
    }
}
