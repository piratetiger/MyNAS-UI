import { Injectable } from '@angular/core';

import serviceList, { IServiceList } from './api.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataResult } from '../models/data-result';
import { ImageModel } from '../models/image-model';
import { VideoModel } from '../models/video-model';
import { UserModel } from '../models/user-model';
import { FileModel } from '../models/file-model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    public serviceUrls = serviceList;

    public image: NASApiService<ImageModel>;
    public video: NASApiService<VideoModel>;
    public file: NASApiService<FileModel>;
    public user: NASApiService<UserModel>;

    constructor(private http: HttpClient) {
        this.image = new NASApiService<ImageModel>(http, serviceList.image);
        this.video = new NASApiService<VideoModel>(http, serviceList.video);
        this.file = new NASApiService<FileModel>(http, serviceList.file);
        this.user = new NASApiService<UserModel>(http, serviceList.user);
    }

    public login(body: any): Observable<DataResult<UserModel>> {
        return this.http.post<DataResult<UserModel>>(
            serviceList.user.login,
            body
        );
    }
}

class NASApiService<T> {
    constructor(private http: HttpClient, private serviceList: IServiceList) {}

    public uploadItem(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(
            this.serviceList.uploadItem,
            body
        );
    }

    public getItemList(body: any): Observable<DataResult<T>> {
        return this.http.post<DataResult<T>>(
            this.serviceList.getItemList,
            body
        );
    }

    public deleteItem(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(
            this.serviceList.deleteItem,
            body
        );
    }

    public updateItem(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(
            this.serviceList.updateItem,
            body
        );
    }

    public addItem(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(
            this.serviceList.addItem,
            body
        );
    }
}
