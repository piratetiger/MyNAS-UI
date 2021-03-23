import { Component, ViewEncapsulation, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { NASModel } from 'src/app/infrastructure/models/nas-model';
import { ApiService } from 'src/app/infrastructure/services/api.service/api.service';
import { AppService } from 'src/app/infrastructure/services/app.service/app.service';
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

    public get selectedItems(): string[] {
        return this.items.filter(s => s.selected).map(s => s.fileName);
    }

    constructor(private service: ApiService, private appService: AppService, private dialogService: DialogService, private mediaListService: MediaListService) {
        this.userName = this.appService.userInfo.userName;
        this.viewMode = this.mediaListService.viewMode;

        this.mediaListService.viewModeChanged.subscribe(e => {
            this.viewMode = e;
        });
    }

    public getImageUrl(item: NASModel) {
        if (item.type === 'video') {
            return `${this.service.serviceUrls.getVideo}?thumb=true&name=${item.fileName}`;
        } else {
            return `${this.service.serviceUrls.getImage}?thumb=true&name=${item.fileName}`;
        }
    }

    public itemClick(item: NASModel) {
        if (this.viewMode) {
            this.showDetail(item);
        } else {
            if (item.selected) {
                item.selected = false;
                this.mediaListService.selectedItems.splice(this.mediaListService.selectedItems.indexOf(item), 1);
            } else {
                item.selected = true;
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
