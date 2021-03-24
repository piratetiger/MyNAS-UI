import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { VideoModel } from '../infrastructure/models/video-model';
import * as utc from 'dayjs/plugin/utc';
import { MediaToolbarComponent } from '../infrastructure/components/media-list/media-toolbar/media-toolbar.component';
dayjs.extend(utc);

@Component({
    selector: 'app-videos',
    templateUrl: './app-videos.component.html',
    styleUrls: ['./app-videos.component.scss'],
})
export class AppVideosComponent implements OnInit, AfterViewInit {
    public videosGroup: any[];
    @ViewChild(MediaToolbarComponent, { static: false }) mediaToolbarComponent: MediaToolbarComponent;

    constructor(private service: ApiService) {
    }

    ngAfterViewInit(): void {
        this.mediaToolbarComponent.refreshList();
    }

    ngOnInit(): void {
        this.refreshVideos();
    }

    public refreshVideos() {
        const startDate = dayjs().subtract(3, 'months').toDate();
        const endDate = new Date();

        this.service.videoService.getItemList({
            start: dayjs(startDate).format('YYYYMMDD'),
            end: dayjs(endDate).format('YYYYMMDD'),
            // owner: this.selectedOwners
        }).subscribe(d => {
            this.videosGroup = [];
            if (d.data.length) {
                const groups = groupBy(d.data, (i: VideoModel) => dayjs(i.date).format('YYYY MM DD'));
                for (const key of Object.keys(groups)) {
                    this.videosGroup.push({
                        date: key,
                        videos: groups[key].reverse()
                    });
                }
            }
        });
    }
}
