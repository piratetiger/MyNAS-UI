import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { LogModel } from 'src/app/shared/models/log-model';
import { AdminApiService } from '../services/admin-api.service';

@Component({
    selector: 'admin-log',
    templateUrl: './admin-log.component.html',
    styleUrls: ['./admin-log.component.scss'],
})
export class AdminLogComponent {
    public auditLogs: LogModel[];
    public errorLogs: LogModel[];
    public logTypes = [
        { label: 'Audit Log', value: 'Audit' },
        { label: 'Error Log', value: 'Error' },
    ];

    public startDate: Date;
    public endDate: Date;
    public logType = this.logTypes[0].value;

    constructor(private adminApi: AdminApiService) {
        this.startDate = dayjs().subtract(3, 'days').toDate();
        this.endDate = new Date();
    }

    public refreshLogs() {
        if (this.logType === this.logTypes[0].value) {
            this.adminApi
                .auditLog({
                    start: dayjs(this.startDate).format('YYYYMMDD'),
                    end: dayjs(this.endDate).format('YYYYMMDD'),
                })
                .subscribe((d) => {
                    this.auditLogs = d.data;
                });
        } else {
            this.adminApi
                .errorLog({
                    start: dayjs(this.startDate).format('YYYYMMDD'),
                    end: dayjs(this.endDate).format('YYYYMMDD'),
                })
                .subscribe((d) => {
                    this.errorLogs = d.data;
                });
        }
    }
}
