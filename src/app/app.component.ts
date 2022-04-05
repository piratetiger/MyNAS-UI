import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/shared/services/app.service';
import { BaseComponent } from './shared/components/base/base.component';
import { MessageModel, MessageType } from './shared/models/message-model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
    public showHeader = true;
    public showFooter = true;
    public isBusy = false;

    constructor(
        private service: AppService,
        private messageService: MessageService
    ) {
        super();
        this.subscription.add(
            this.service.showMessage$.subscribe((msg: MessageModel) => {
                if (msg?.type) {
                    this.messageService.add({
                        severity: MessageType[msg.type].toLowerCase(),
                        summary: msg.title,
                        detail: msg.message,
                    });
                }
            })
        );
        this.subscription.add(
            this.service.busyIndicator$.subscribe((value: boolean) => {
                this.isBusy = value;
            })
        );
        this.subscription.add(
            this.service.showHeader$.subscribe((value: boolean) => {
                this.showHeader = value;
            })
        );
        this.subscription.add(
            this.service.showFooter$.subscribe((value: boolean) => {
                this.showFooter = value;
            })
        );
    }
}
