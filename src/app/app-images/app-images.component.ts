import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MediaToolbarComponent } from '../infrastructure/components/media-list/media-toolbar/media-toolbar.component';

@Component({
    selector: 'app-images',
    templateUrl: './app-images.component.html',
    styleUrls: ['./app-images.component.scss'],
})
export class AppImagesComponent implements AfterViewInit {
    @ViewChild(MediaToolbarComponent, { static: false }) mediaToolbarComponent: MediaToolbarComponent;

    ngAfterViewInit(): void {
        this.mediaToolbarComponent.refreshList();
    }
}
