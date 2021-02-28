import { Component } from '@angular/core';
import * as moment from 'moment';
import { LogModel } from '../../infrastructure/models/log-model';
import { AdminApiService } from '../../infrastructure/services/admin-api.service/admin-api.service';

@Component({
    selector: 'admin-log',
    templateUrl: './admin-log.component.html',
    styleUrls: ['./admin-log.component.scss']
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

    constructor(private service: AdminApiService) {
        this.startDate = moment().subtract(3, 'days').toDate();
        this.endDate = new Date();
    }

    public refreshLogs() {
        if (this.logType === this.logTypes[0].value) {
            this.service.auditLog({
                start: moment(this.startDate).format('YYYYMMDD'),
                end: moment(this.endDate).format('YYYYMMDD')
            }).subscribe(d => {
                this.auditLogs = d.data;
            });
        } else {
            this.service.errorLog({
                start: moment(this.startDate).format('YYYYMMDD'),
                end: moment(this.endDate).format('YYYYMMDD')
            }).subscribe(d => {
                this.errorLogs = d.data;
            });
        }
    }
}
