import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MediaToolbarComponent } from 'src/app/shared/components/media-list/media-toolbar/media-toolbar.component';

@Component({
    selector: 'app-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements AfterViewInit {
    @ViewChild(MediaToolbarComponent, { static: false }) mediaToolbarComponent: MediaToolbarComponent;

    ngAfterViewInit(): void {
        this.mediaToolbarComponent.refreshList();
    }
}
