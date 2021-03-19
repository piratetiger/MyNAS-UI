import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/infrastructure/services/api.service/api.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LightboxItemModel } from '../models/lightbox-item-model';

@Component({
    selector: 'image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageViewerComponent implements OnInit {
    @Input() items: LightboxItemModel[] = [];
    @Input() current: LightboxItemModel;

    constructor(private service: ApiService, private config: DynamicDialogConfig) { }

    ngOnInit() {
        this.current = this.config.data.current;
        this.items = this.config.data.items;
    }

    public getImageUrl(item: LightboxItemModel) {
        return `${this.service.serviceUrls.getImage}?thumb=false&name=${item.name}`;
    }
}
