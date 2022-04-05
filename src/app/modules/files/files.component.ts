import { OnInit, Component } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppService } from 'src/app/shared/services/app.service';
import { ConfirmationService } from 'primeng/api';
import { FileModel } from 'src/app/shared/models/file-model';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss'],
})
export class FilesComponent extends BaseComponent implements OnInit {
    private _toolbarState: string;
    private _cate: string = null;

    public viewMode = true;
    public fileList: FileModel[];
    public uploadFileList: any[] = [];
    public owners: any[] = [];
    public selectedOwners: string[] = [];
    public isPublic = true;
    public pathList: FileModel[] = [];

    public userName;

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

    constructor(
        private api: ApiService,
        private service: AppService,
        private confirmationService: ConfirmationService
    ) {
        super();
        this.subscription.add(
            this.service.refreshUserInfo$.subscribe((user) => {
                this.userName = user?.userName;
            })
        );
    }

    ngOnInit(): void {
        this.refreshFiles();
    }

    public uploadFiles(event) {
        this.confirmationService.confirm({
            message: `Upload all ${event.files.length} items?`,
            accept: () => {
                const formData = new FormData();
                for (const file of event.files) {
                    formData.append('files', file);
                }
                formData.set('isPublic', this.isPublic.toString());
                formData.set('cate', this._cate);
                this.api.file.uploadItem(formData).subscribe((d) => {
                    this.uploadFileList = [];
                    if (d.data) {
                        this.refreshFiles();
                    }
                });
            },
        });
    }

    public createFolder(name: string) {
        this.confirmationService.confirm({
            message: `Create new folder ${name}?`,
            accept: () => {
                const request = {
                    name: name,
                    cate: this._cate,
                    isPublic: this.isPublic,
                };
                this.api.file.addItem(request).subscribe((d) => {
                    this.refreshFiles();
                });
            },
        });
    }

    public pathClick(path: FileModel) {
        if (path) {
            const index = this.pathList.indexOf(path);
            if (index >= 0) {
                this.pathList.splice(index + 1, this.pathList.length);
                this._cate = path.keyName;
            }
        } else {
            this.pathList = [];
            this._cate = null;
        }

        this.refreshFiles();
    }

    public fileClick(file: FileModel) {
        if (file.isFolder) {
            this._cate = file.keyName;
            this.pathList.push(file);
            this.refreshFiles();
        } else {
            window.open(
                `${this.api.serviceUrls.file.getItem}?name=${file.keyName}`,
                '_blank'
            );
        }
    }

    public refreshFiles() {
        this.api.file
            .getItemList({
                cate: this._cate,
                owner: this.selectedOwners,
            })
            .subscribe((d) => {
                this.fileList = d.data;
            });
    }
}
