import { Component, OnInit } from "@angular/core";
import * as dayjs from 'dayjs';
import { ConfirmationService } from "primeng/api";
import { NASModel } from "src/app/infrastructure/models/nas-model";
import { ApiService } from "src/app/infrastructure/services/api.service/api.service";
import { MediaListService } from "../media-list-services/media-list.service";

@Component({
    selector: 'media-toolbar',
    templateUrl: './media-toolbar.component.html',
    styleUrls: ['./media-toolbar.component.scss'],
})
export class MediaToolbarComponent implements OnInit {
    private _toolbarState: string;

    public viewMode: boolean = true;
    public isPublic = true;
    public startDate: Date;
    public endDate: Date;
    public uploadFileList: any[] = [];
    public owners: any[] = [];
    public selectedOwners: string[] = [];
    public mediaDate: Date = new Date();
    public newDate: Date = new Date();

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

    public get selectedItems(): NASModel[] {
        return this.mediaListService.selectedItems;
    }

    constructor(private mediaListService: MediaListService, private service: ApiService, private confirmationService: ConfirmationService) {
        this.startDate = dayjs().subtract(3, 'months').toDate();
        this.endDate = new Date();
    }

    ngOnInit(): void {
        this.service.getUserList().subscribe(d => {
            this.owners = d.data.map(u => {
                return { 'label': u.nickName ? u.nickName : u.userName, 'value': u.userName };
            });
        });
    }

    public viewModeChange(e) {
        this.mediaListService.editModeChanged.emit(!e.checked);
        this.toolbarState = null;
    }

    public deleteFiles() {
        this.confirmationService.confirm({
            message: `Are you sure that you want to delete all ${this.selectedItems.length} items?`,
            accept: () => {
                this.service.deleteVideo({
                    names: this.selectedItems
                }).subscribe(d => {
                    this.refreshList();
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
                formData.set('date', dayjs(this.mediaDate).format('YYYYMMDD'));
                formData.set('isPublic', this.isPublic.toString());
                this.service.uploadVideo(formData).subscribe(d => {
                    this.uploadFileList = [];
                    if (d.data) {
                        this.refreshList();
                    }
                });
            }
        });
    }

    public updateDate() {
        const newModel = new NASModel();
        newModel.date = dayjs(dayjs(this.newDate).format('YYYYMMDD'), 'YYYYMMDD').utc(true).toDate();
        this.service.updateVideoDate({
            names: this.selectedItems,
            newModel: newModel
        }).subscribe(d => {
            this.refreshList();
        });
    }

    public refreshList() {
        this.mediaListService.refreshMediaList.emit({
            start: dayjs(this.startDate).format('YYYYMMDD'),
            end: dayjs(this.endDate).format('YYYYMMDD'),
            owner: this.selectedOwners
        });
    }
}