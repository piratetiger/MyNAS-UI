import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { groupBy } from 'lodash';
import { ConfirmationService } from "primeng/api";
import { forkJoin } from "rxjs";
import { NASModel } from "src/app/infrastructure/models/nas-model";
import { ApiService } from "src/app/infrastructure/services/api.service/api.service";
import { MediaListService } from "../media-list-services/media-list.service";
dayjs.extend(utc);

@Component({
    selector: 'media-toolbar',
    templateUrl: './media-toolbar.component.html',
    styleUrls: ['./media-toolbar.component.scss'],
})
export class MediaToolbarComponent implements OnInit, OnDestroy {
    @Input() type: string = 'video,image';
    public static typeAcceptMapping = {
        video: 'video/mp4',
        image: 'image/jpeg'
    }

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

    public get acceptType(): string {
        return this.type.split(',').map(t => MediaToolbarComponent.typeAcceptMapping[t]).join(',');
    }

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

    ngOnDestroy(): void {
        this.mediaListService.reset();
    }

    ngOnInit(): void {
        this.service.userService.getItemList({}).subscribe(d => {
            this.owners = d.data.map(u => {
                return { 'label': u.nickName ? u.nickName : u.userName, 'value': u.userName };
            });
        });
    }

    public viewModeChange(e) {
        this.mediaListService.viewModeChanged.emit(e.checked);
        this.toolbarState = null;
    }

    public deleteFiles() {
        this.confirmationService.confirm({
            message: `Are you sure that you want to delete all ${this.selectedItems.length} items?`,
            accept: () => {
                const items = this.selectedItems.splice(0, this.selectedItems.length);

                const groups = groupBy(items, (i: NASModel) => i.type);
                const callList = Object.keys(groups).map(key => {
                    return this.service[key + 'Service'].deleteItem({
                        names: groups[key].map((i: NASModel) => i.fileName)
                    });
                })

                forkJoin(callList).subscribe(d => {
                    this.refreshList();
                });
            }
        });
    }

    public uploadFiles(event) {
        this.confirmationService.confirm({
            message: `Upload all ${event.files.length} items?`,
            accept: () => {
                const groups = groupBy(event.files, f => f.type.split('/')[0]);

                const callList = Object.keys(groups).map(key => {
                    const formData = new FormData();
                    for (const file of groups[key]) {
                        formData.append('files', file);
                    }
                    formData.set('date', dayjs(this.mediaDate).format('YYYYMMDD'));
                    formData.set('isPublic', this.isPublic.toString());
                    return this.service[key + 'Service'].uploadItem(formData);
                })

                forkJoin(callList).subscribe(d => {
                    this.uploadFileList = [];
                    this.refreshList();
                })
            }
        });
    }

    public updateDate() {
        const newModel = new NASModel();
        newModel.date = dayjs(dayjs(this.newDate).format('YYYYMMDD'), 'YYYYMMDD').utc(true).toDate();

        const items = this.selectedItems.splice(0, this.selectedItems.length);

        const groups = groupBy(items, (i: NASModel) => i.type);
        const callList = Object.keys(groups).map(key => {
            return this.service[key + 'Service'].updateItem({
                names: groups[key].map((i: NASModel) => i.fileName),
                newModel: newModel
            });
        })

        forkJoin(callList).subscribe(d => {
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