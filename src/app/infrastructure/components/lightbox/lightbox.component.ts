import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service/api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';
import { LightboxItemModel } from './models/lightbox-item-model';

@Component({
    selector: 'lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LightboxComponent implements OnChanges {
    @Input() items: LightboxItemModel[] = [];
    @Input() editMode = false;

    public get selectedItems(): string[] {
        return this.items.filter(s => s.selected).map(s => s.name);
    }

    constructor(private service: ApiService, private dialogService: DialogService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.editMode) {
            this.items.forEach(s => s.selected = false);
        }
    }

    public getImageUrl(item: LightboxItemModel) {
        if (item.type === 'video') {
            return `${this.service.serviceUrls.getVideo}?thumb=true&name=${item.name}`;
        } else {
            return `${this.service.serviceUrls.getImage}?thumb=true&name=${item.name}`;
        }
    }

    public itemClick(item: LightboxItemModel) {
        if (!this.editMode) {
            this.showDetail(item);
        } else {
            item.selected = !item.selected;
        }
    }

    public showDetail(item: LightboxItemModel) {
        if (item.type === 'video') {
            this.dialogService.open(VideoViewerComponent, {
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
        } else {
            this.dialogService.open(ImageViewerComponent, {
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
}
