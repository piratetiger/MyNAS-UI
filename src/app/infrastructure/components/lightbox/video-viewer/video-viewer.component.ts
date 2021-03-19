import { Component, ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/infrastructure/services/api.service/api.service';
import { LightboxItemModel } from '../models/lightbox-item-model';
import { CommonViewerComponent } from '../common-viewer/common-viewer.component';
declare var videojs: any;

@Component({
    selector: 'video-viewer',
    templateUrl: './video-viewer.component.html',
    styleUrls: ['./video-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VideoViewerComponent extends CommonViewerComponent implements AfterViewInit {
    constructor(private service: ApiService, private element: ElementRef) {
        super();
    }

    ngAfterViewInit() {
        videojs(this.element.nativeElement.querySelector('.video-js'));
    }

    public getVideoUrl(item: LightboxItemModel) {
        return `${this.service.serviceUrls.getVideo}?thumb=false&name=${item.name}`;
    }
}
