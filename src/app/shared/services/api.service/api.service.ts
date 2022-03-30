import { Injectable } from '@angular/core';

import serviceList from './api.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataResult } from '../../models/data-result';
import { ImageModel } from '../../models/image-model';
import { VideoModel } from '../../models/video-model';
import { UserModel } from '../../models/user-model';
import { FileModel } from '../../models/file-model';

@Injectable()
export class ApiService {
    public serviceUrls = serviceList;

    public imageService: NASApiService<ImageModel>;
    public videoService: NASApiService<VideoModel>;
    public fileService: NASApiService<FileModel>;
    public userService: NASApiService<UserModel>;

    constructor(private http: HttpClient) {
        this.imageService = new NASApiService<ImageModel>(http, 'image');
        this.videoService = new NASApiService<VideoModel>(http, 'video');
        this.fileService = new NASApiService<FileModel>(http, 'file');
        this.userService = new NASApiService<UserModel>(http, 'user');
    }

    public login(body: any): Observable<DataResult<UserModel>> {
        return this.http.post<DataResult<UserModel>>(serviceList.user.login, body);
    }
}

class NASApiService<T> {
    constructor(private http: HttpClient, private type: string) { }

    public uploadItem(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList[this.type].uploadItem, body);
    }

    public getItemList(body: any): Observable<DataResult<T>> {
        return this.http.post<DataResult<T>>(serviceList[this.type].getItemList, body);
    }

    public deleteItem(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList[this.type].deleteItem, body);
    }

    public updateItem(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList[this.type].updateItem, body);
    }

    public addItem(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList[this.type].addItem, body);
    }
}
