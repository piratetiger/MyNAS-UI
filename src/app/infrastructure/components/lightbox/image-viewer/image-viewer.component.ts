import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/infrastructure/services/api.service/api.service';
import { LightboxItemModel } from '../models/lightbox-item-model';
import { CommonViewerComponent } from '../common-viewer/common-viewer.component';

@Component({
    selector: 'image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageViewerComponent extends CommonViewerComponent {

    constructor(private service: ApiService) {
        super();
    }

    public getImageUrl(item: LightboxItemModel) {
        return `${this.service.serviceUrls.getImage}?thumb=false&name=${item.name}`;
    }
}
