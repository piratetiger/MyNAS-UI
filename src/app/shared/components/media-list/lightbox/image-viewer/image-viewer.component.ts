import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonViewerComponent } from '../common-viewer/common-viewer.component';
import { NASModel } from 'src/app/shared/models/nas-model';

@Component({
    selector: 'image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ImageViewerComponent extends CommonViewerComponent {
    constructor(private api: ApiService) {
        super();
    }

    public getImageUrl(item: NASModel) {
        return `${this.api.serviceUrls.image.getItem}?thumb=false&name=${item.fileName}`;
    }
}
