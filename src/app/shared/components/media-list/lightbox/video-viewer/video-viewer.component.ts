import {
    Component,
    ViewEncapsulation,
    AfterViewInit,
    ElementRef,
} from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonViewerComponent } from '../common-viewer/common-viewer.component';
import { NASModel } from 'src/app/shared/models/nas-model';
declare var videojs: any;

@Component({
    selector: 'video-viewer',
    templateUrl: './video-viewer.component.html',
    styleUrls: ['./video-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class VideoViewerComponent
    extends CommonViewerComponent
    implements AfterViewInit
{
    constructor(private api: ApiService, private element: ElementRef) {
        super();
    }

    ngAfterViewInit() {
        videojs(this.element.nativeElement.querySelector('.video-js'));
    }

    public getVideoUrl(item: NASModel) {
        return `${this.api.serviceUrls.video.getItem}?thumb=false&name=${item.fileName}`;
    }
}
