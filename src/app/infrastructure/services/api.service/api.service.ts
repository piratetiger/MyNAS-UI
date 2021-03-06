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

    constructor(private http: HttpClient) { }

    public login(body: any): Observable<DataResult<UserModel>> {
        return this.http.post<DataResult<UserModel>>(serviceList.login, body);
    }

    // images
    public uploadImage(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.uploadImage, body);
    }
    public getImageList(body: any): Observable<DataResult<ImageModel>> {
        return this.http.post<DataResult<ImageModel>>(serviceList.getImageList, body);
    }
    public deleteImage(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.deleteImage, body);
    }
    public updateImageDate(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.updateImageDate, body);
    }

    // videos
    public uploadVideo(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.uploadVideo, body);
    }
    public getVideoList(body: any): Observable<DataResult<VideoModel>> {
        return this.http.post<DataResult<VideoModel>>(serviceList.getVideoList, body);
    }
    public deleteVideo(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.deleteVideo, body);
    }
    public updateVideoDate(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.updateVideoDate, body);
    }

    // files
    public uploadFile(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.uploadFile, body);
    }
    public getFileList(body: any): Observable<DataResult<FileModel>> {
        return this.http.post<DataResult<FileModel>>(serviceList.getFileList, body);
    }
    public createFolder(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.createFolder, body);
    }

    // user
    public updateUser(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(serviceList.updateUser, body);
    }

    public getUserList(): Observable<DataResult<UserModel>> {
        return this.http.post<DataResult<UserModel>>(serviceList.getUserList, {});
    }
}
