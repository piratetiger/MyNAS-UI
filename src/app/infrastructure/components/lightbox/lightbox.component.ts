import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service/api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DetailViewerComponent } from './detail-viewer/detail-viewer.component';
import { NASModel } from '../../models/nas-model';
import { AppService } from '../../services/app.service/app.service';

@Component({
    selector: 'lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LightboxComponent implements OnChanges {
    @Input() items: NASModel[] = [];
    @Input() editMode = false;

    public userName;

    public get selectedItems(): string[] {
        return this.items.filter(s => s.selected).map(s => s.fileName);
    }

    constructor(private service: ApiService, private appService: AppService, private dialogService: DialogService) {
        this.userName = this.appService.userInfo.userName;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.editMode) {
            this.items.forEach(s => s.selected = false);
        }
    }

    public getImageUrl(item: NASModel) {
        if (item.type === 'video') {
            return `${this.service.serviceUrls.getVideo}?thumb=true&name=${item.fileName}`;
        } else {
            return `${this.service.serviceUrls.getImage}?thumb=true&name=${item.fileName}`;
        }
    }

    public itemClick(item: NASModel) {
        if (!this.editMode) {
            this.showDetail(item);
        } else {
            item.selected = !item.selected;
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
