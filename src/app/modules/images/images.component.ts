import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MediaToolbarComponent } from 'src/app/shared/components/media-list/media-toolbar/media-toolbar.component';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements AfterViewInit {
    @ViewChild(MediaToolbarComponent, { static: false }) mediaToolbarComponent: MediaToolbarComponent;

    ngAfterViewInit(): void {
        this.mediaToolbarComponent.refreshList();
    }
}
