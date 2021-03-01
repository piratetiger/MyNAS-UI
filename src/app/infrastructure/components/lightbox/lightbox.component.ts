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
    @Input() sources: LightboxItemModel[] = [];
    @Input() type = 'image';
    @Input() editMode = false;

    public get selectedItems(): string[] {
        return this.sources.filter(s => s.selected).map(s => s.fileSource);
    }

    constructor(private service: ApiService, private dialogService: DialogService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.editMode) {
            this.sources.forEach(s => s.selected = false);
        }
    }

    public getImageUrl(source: string) {
        if (this.type === 'video') {
            return `${this.service.serviceUrls.getVideo}?thumb=true&name=${source}`;
        } else {
            return `${this.service.serviceUrls.getImage}?thumb=true&name=${source}`;
        }
    }

    public itemClick(item: LightboxItemModel) {
        if (!this.editMode) {
            this.showDetail(item.fileSource);
        } else {
            item.selected = !item.selected;
        }
    }

    public showDetail(source: string) {
        if (this.type === 'video') {
            this.dialogService.open(VideoViewerComponent, {
                data: {
                    sources: this.sources,
                    current: source
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
                    sources: this.sources,
                    current: source
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
