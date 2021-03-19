import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import * as dayjs from 'dayjs';
import { groupBy, flatten } from 'lodash';
import { ApiService } from '../infrastructure/services/api.service/api.service';
import { ImageModel } from '../infrastructure/models/image-model';
import { LightboxComponent } from '../infrastructure/components/lightbox/lightbox.component';
import { ConfirmationService } from 'primeng/api';
import { LightboxItemModel } from '../infrastructure/components/lightbox/models/lightbox-item-model';
import { AppService } from '../infrastructure/services/app.service/app.service';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@Component({
    selector: 'app-images',
    templateUrl: './app-images.component.html',
    styleUrls: ['./app-images.component.scss'],
})
export class AppImagesComponent implements OnInit {
    private _toolbarState: string;

    public viewMode = true;
    public imagesGroup: any[];
    public uploadFileList: any[] = [];
    public startDate: Date;
    public endDate: Date;
    public owners: any[] = [];
    public selectedOwners: string[] = [];
    public imagesDate: Date = new Date();
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
        this.refreshImages();
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
                this.service.deleteImage({
                    names: this.selectedItems
                }).subscribe(d => {
                    this.refreshImages();
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
                formData.set('date', dayjs(this.imagesDate).format('YYYYMMDD'));
                formData.set('isPublic', this.isPublic.toString());
                this.service.uploadImage(formData).subscribe(d => {
                    this.uploadFileList = [];
                    if (d.data) {
                        this.refreshImages();
                    }
                });
            }
        });
    }

    public updateDate() {
        const newModel = new ImageModel();
        newModel.date = dayjs(dayjs(this.newDate).format('YYYYMMDD'), 'YYYYMMDD').utc(true).toDate();
        this.service.updateImageDate({
            names: this.selectedItems,
            newModel: newModel
        }).subscribe(d => {
            this.refreshImages();
        });
    }

    public refreshImages() {
        this.service.getImageList({
            start: dayjs(this.startDate).format('YYYYMMDD'),
            end: dayjs(this.endDate).format('YYYYMMDD'),
            owner: this.selectedOwners
        }).subscribe(d => {
            this.imagesGroup = [];
            if (d.data.length) {
                const groups = groupBy(d.data, (i: ImageModel) => i.date);
                const userName = this.appService.userInfo.userName;
                for (const i of Object.keys(groups)) {
                    this.imagesGroup.push({
                        date: dayjs(i).format('YYYY MM DD'),
                        images: groups[i].map((m: ImageModel) => <LightboxItemModel>{
                            name: m.fileName,
                            type: 'image',
                            isPublic: m.isPublic,
                            isOwner: m.owner === userName
                        }).reverse()
                    });
                }
            }
        });
    }
}
