import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/infrastructure/services/api.service/api.service';
import { CommonViewerComponent } from '../common-viewer/common-viewer.component';
import { NASModel } from 'src/app/infrastructure/models/nas-model';

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

    public getImageUrl(item: NASModel) {
        return `${this.service.serviceUrls.getImage}?thumb=false&name=${item.fileName}`;
    }
}
