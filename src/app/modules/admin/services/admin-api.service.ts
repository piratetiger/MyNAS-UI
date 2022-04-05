import { Injectable } from '@angular/core';

import serviceList from './admin-api.service-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel } from 'src/app/shared/models/user-model';
import { DataResult } from 'src/app/shared/models/data-result';
import { LogModel } from 'src/app/shared/models/log-model';

@Injectable()
export class AdminApiService {
    public serviceUrls = serviceList;

    constructor(private http: HttpClient) {}

    public getUserList(): Observable<DataResult<UserModel>> {
        return this.http.post<DataResult<UserModel>>(
            serviceList.getUserList,
            {}
        );
    }

    public createUser(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(
            serviceList.createUser,
            body
        );
    }

    public updateUser(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(
            serviceList.updateUser,
            body
        );
    }

    public deleteUser(body: any): Observable<DataResult<boolean>> {
        return this.http.post<DataResult<boolean>>(
            serviceList.deleteUser,
            body
        );
    }

    public auditLog(body: any): Observable<DataResult<LogModel>> {
        return this.http.post<DataResult<LogModel>>(serviceList.auditLog, body);
    }

    public errorLog(body: any): Observable<DataResult<LogModel>> {
        return this.http.post<DataResult<LogModel>>(serviceList.errorLog, body);
    }
}
