import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import * as moment from 'moment';
import { groupBy, flatten } from 'lodash';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { VideoModel } from '../infrastructure/models/video-model';
import { LightboxComponent } from '../infrastructure/components/lightbox/lightbox.component';
import { ConfirmationService } from 'primeng/api';
import { LightboxItemModel } from '../infrastructure/components/lightbox/models/lightbox-item-model';
import { AppService } from '../infrastructure/services/app.service/app.service';

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
        this.startDate = moment().subtract(3, 'months').toDate();
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
                formData.set('date', moment(this.videosDate).format('YYYYMMDD'));
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
        newModel.date = moment.utc(moment(this.newDate).format('YYYYMMDD'), 'YYYYMMDD').toDate();
        this.service.updateVideoDate({
            names: this.selectedItems,
            newModel: newModel
        }).subscribe(d => {
            this.refreshVideos();
        });
    }

    public refreshVideos() {
        this.service.getVideoList({
            start: moment(this.startDate).format('YYYYMMDD'),
            end: moment(this.endDate).format('YYYYMMDD'),
            owner: this.selectedOwners
        }).subscribe(d => {
            this.videosGroup = [];
            if (d.data.length) {
                const groups = groupBy(d.data, (i: VideoModel) => i.date);
                const userName = this.appService.userInfo.userName;
                for (const i of Object.keys(groups)) {
                    this.videosGroup.push({
                        date: moment(i).format('YYYY MM DD'),
                        videos: groups[i].map((m: VideoModel) => <LightboxItemModel>{
                            fileSource: m.fileName,
                            isPublic: m.isPublic,
                            isOwner: m.owner === userName
                        }).reverse()
                    });
                }
            }
        });
    }
}
