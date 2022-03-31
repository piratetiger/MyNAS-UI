import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/shared/services/app.service';
import { MessageModel, MessageType } from './shared/models/message-model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public showHeader = true;
    public showFooter = true;
    public isBusy = false;

    constructor(private service: AppService, private messageService: MessageService) {
        this.service.messages.subscribe((msg: MessageModel) => {
            this.messageService.add({ severity: MessageType[msg.type].toLowerCase(), summary: msg.title, detail: msg.message });
        });

        this.service.busyIndicator.subscribe((value: boolean) => {
            this.isBusy = value;
        });

        this.service.showHeader.subscribe((value: boolean) => {
            this.showHeader = value;
        });

        this.service.showFooter.subscribe((value: boolean) => {
            this.showFooter = value;
        });
    }
}
