import { Component, ViewEncapsulation, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/infrastructure/services/api.service/api.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
declare var videojs: any;

@Component({
    selector: 'video-viewer',
    templateUrl: './video-viewer.component.html',
    styleUrls: ['./video-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VideoViewerComponent implements OnInit, AfterViewInit {
    @Input() sources: string[] = [];
    @Input() current: string;

    constructor(private service: ApiService, private config: DynamicDialogConfig, private element: ElementRef) { }

    ngOnInit() {
        this.current = this.config.data.current;
        this.sources = this.config.data.sources;
    }

    ngAfterViewInit() {
        videojs(this.element.nativeElement.querySelector('.video-js'));
    }

    public getVideoUrl(image: string) {
        return `${this.service.serviceUrls.getVideo}?thumb=false&name=${image}`;
    }
}
