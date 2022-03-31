import { Component, ViewEncapsulation, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { NASModel } from 'src/app/shared/models/nas-model';
import { ApiService } from 'src/app/shared/services/api.service/api.service';
import { AppService } from 'src/app/shared/services/app.service';
import { MediaListService } from '../media-list-services/media-list.service';
import { DetailViewerComponent } from './detail-viewer/detail-viewer.component';

@Component({
    selector: 'lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LightboxComponent {
    @Input() items: NASModel[] = [];

    public viewMode: boolean;
    public userName: string;

    public get selectedItems(): NASModel[] {
        return this.mediaListService.selectedItems;
    }

    constructor(private service: ApiService, private appService: AppService, private dialogService: DialogService, private mediaListService: MediaListService) {
        this.userName = this.appService.userInfo.userName;
        this.viewMode = this.mediaListService.viewMode;

        this.mediaListService.viewModeChanged.subscribe(e => {
            this.viewMode = e;
        });
    }

    public getImageUrl(item: NASModel) {
        return `${this.service.serviceUrls[item.type].getItem}?thumb=true&name=${item.fileName}`;
    }

    public itemClick(item: NASModel) {
        if (this.viewMode) {
            this.showDetail(item);
        } else {
            const index = this.selectedItems.indexOf(item);
            if (index > -1) {
                this.mediaListService.selectedItems.splice(index, 1);
            } else {
                this.mediaListService.selectedItems.push(item);
            }
        }
    }

    public showDetail(item: NASModel) {
        this.dialogService.open(DetailViewerComponent, {
            data: {
                items: this.items,
                current: item
            },
            header: '',
            width: '70%',
            height: '70%',
            styleClass: 'lightbox-detail',
            dismissableMask: true
        });
    }
}
