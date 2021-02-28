import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/infrastructure/services/api.service/api.service';
import { DynamicDialogConfig } from 'primeng/api';

@Component({
    selector: 'image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImageViewerComponent implements OnInit {
    @Input() sources: string[] = [];
    @Input() current: string;

    constructor(private service: ApiService, private config: DynamicDialogConfig) { }

    ngOnInit() {
        this.current = this.config.data.current;
        this.sources = this.config.data.sources;
    }

    public getImageUrl(image: string) {
        return `${this.service.serviceUrls.getImage}?thumb=false&name=${image}`;
    }
}
