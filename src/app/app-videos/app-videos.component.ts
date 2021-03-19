import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import * as dayjs from 'dayjs';
import { groupBy, flatten } from 'lodash';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { VideoModel } from '../infrastructure/models/video-model';
import { LightboxComponent } from '../infrastructure/components/lightbox/lightbox.component';
import { ConfirmationService } from 'primeng/api';
import { LightboxItemModel } from '../infrastructure/components/lightbox/models/lightbox-item-model';
import { AppService } from '../infrastructure/services/app.service/app.service';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@Component({
    selector: 'app-videos',
    templateUrl: './app-videos.component.html',
    styleUrls: ['./app-videos.component.scss'],
})
export class AppVideosComponent implements OnInit {
    private _toolbarState: string;

    public viewMode = true;
    public videosGroup: any[];
    public uploadFileList: any[] = [];
    public startDate: Date;
    public endDate: Date;
    public owners: any[] = [];
    public selectedOwners: string[] = [];
    public videosDate: Date = new Date();
    public isPublic = true;
    public newDate: Date = new Date();

    public get selectedItems(): string[] {
        return flatten(this.lightboxes.map(l => l.selectedItems));
    }

    @ViewChildren('lightbox') lightboxes: QueryList<LightboxComponent>;

    public get toolbarState(): string {
        return this._toolbarState;
    }

    public set toolbarState(value) {
        if (value === this._toolbarState) {
            this._toolbarState = null;
        } else {
            this._toolbarState = value;
        }
        this.isPublic = true;
    }

    constructor(private service: ApiService, private appService: AppService, private confirmationService: ConfirmationService) {
        this.startDate = dayjs().subtract(3, 'months').toDate();
        this.endDate = new Date();
    }

    ngOnInit(): void {
        this.refreshVideos();
        this.service.getUserList().subscribe(d => {
            this.owners = d.data.map(u => {
                return { 'label': u.nickName ? u.nickName : u.userName, 'value': u.userName };
            });
        });
    }

    public deleteFiles() {
        this.confirmationService.confirm({
            message: `Are you sure that you want to delete all ${this.selectedItems.length} items?`,
            accept: () => {
                this.service.deleteVideo({
                    names: this.selectedItems
                }).subscribe(d => {
                    this.refreshVideos();
                });
            }
        });
    }

    public uploadFiles(event) {
        this.confirmationService.confirm({
            message: `Upload all ${event.files.length} items?`,
            accept: () => {
                const formData = new FormData();
                for (const file of event.files) {
                    formData.append('files', file);
                }
                formData.set('date', dayjs(this.videosDate).format('YYYYMMDD'));
                formData.set('isPublic', this.isPublic.toString());
                this.service.uploadVideo(formData).subscribe(d => {
                    this.uploadFileList = [];
                    if (d.data) {
                        this.refreshVideos();
                    }
                });
            }
        });
    }

    public updateDate() {
        const newModel = new VideoModel();
        newModel.date = dayjs(dayjs(this.newDate).format('YYYYMMDD'), 'YYYYMMDD').utc(true).toDate();
        this.service.updateVideoDate({
            names: this.selectedItems,
            newModel: newModel
        }).subscribe(d => {
            this.refreshVideos();
        });
    }

    public refreshVideos() {
        this.service.getVideoList({
            start: dayjs(this.startDate).format('YYYYMMDD'),
            end: dayjs(this.endDate).format('YYYYMMDD'),
            owner: this.selectedOwners
        }).subscribe(d => {
            this.videosGroup = [];
            if (d.data.length) {
                const groups = groupBy(d.data, (i: VideoModel) => dayjs(i.date).format('YYYY MM DD'));
                const userName = this.appService.userInfo.userName;
                for (const key of Object.keys(groups)) {
                    this.videosGroup.push({
                        date: key,
                        videos: groups[key].map((m: VideoModel) => <LightboxItemModel>{
                            name: m.fileName,
                            type: 'video',
                            isPublic: m.isPublic,
                            isOwner: m.owner === userName
                        }).reverse()
                    });
                }
            }
        });
    }
}
