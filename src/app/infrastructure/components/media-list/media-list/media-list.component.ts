import { Component, Input } from "@angular/core";
import * as dayjs from 'dayjs';
import { ApiService } from "src/app/infrastructure/services/api.service/api.service";
import { MediaListService } from "../media-list-services/media-list.service";
import { groupBy } from 'lodash';
import { NASModel } from "src/app/infrastructure/models/nas-model";
import { forkJoin } from "rxjs";
import { DataResult } from "src/app/infrastructure/models/data-result";

@Component({
    selector: 'media-list',
    templateUrl: './media-list.component.html',
    styleUrls: ['./media-list.component.scss'],
})
export class MediaListComponent {
    @Input() type: string = 'video,image';

    public itemGroup: any[];

    constructor(private mediaListService: MediaListService, private service: ApiService) {
        this.mediaListService.refreshMediaList.subscribe(data => {
            this.refreshList(data);
        })
    }

    public refreshList(data) {
        const callList = this.type.split(',').map(type => {
            return this.service[type + 'Service'].getItemList(data);
        })

        forkJoin(callList).subscribe((d: DataResult<NASModel>[]) => {
            this.itemGroup = [];
            const data = d.map(d => d.data).flatMap(d => d);

            if (data.length) {
                const groups = groupBy(data, (i: NASModel) => dayjs(i.date).format('YYYY MM DD'));
                for (const key of Object.keys(groups)) {
                    this.itemGroup.push({
                        date: key,
                        items: groups[key].reverse()
                    });
                }
            }
        });
    }
}