import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MediaToolbarComponent } from '../infrastructure/components/media-list/media-toolbar/media-toolbar.component';

@Component({
    selector: 'app-videos',
    templateUrl: './app-videos.component.html',
    styleUrls: ['./app-videos.component.scss'],
})
export class AppVideosComponent implements AfterViewInit {
    @ViewChild(MediaToolbarComponent, { static: false }) mediaToolbarComponent: MediaToolbarComponent;

    ngAfterViewInit(): void {
        this.mediaToolbarComponent.refreshList();
    }
}
