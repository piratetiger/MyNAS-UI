import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import * as dayjs from 'dayjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { MediaListService } from '../media-list-services/media-list.service';
import { groupBy, take } from 'lodash-es';
import { NASModel } from 'src/app/shared/models/nas-model';
import { forkJoin } from 'rxjs';
import { DataResult } from 'src/app/shared/models/data-result';
import { AccordionTab } from 'primeng/accordion';

@Component({
    selector: 'media-list',
    templateUrl: './media-list.component.html',
    styleUrls: ['./media-list.component.scss'],
})
export class MediaListComponent implements AfterViewInit {
    @ViewChild('mediaContent') mediaContent: ElementRef;
    @ViewChildren(AccordionTab, { read: ElementRef })
    tabs: QueryList<ElementRef>;
    @Input() type: string = 'video,image';

    public itemGroup: any[];

    constructor(
        private mediaListService: MediaListService,
        private api: ApiService
    ) {
        this.mediaListService.refreshMediaList.subscribe((data) => {
            this.refreshList(data);
        });
    }

    ngAfterViewInit(): void {
        this.updateListDisplay();
    }

    public refreshList(data) {
        const callList = this.type.split(',').map((type) => {
            return this.api[type].getItemList(data);
        });

        forkJoin(callList).subscribe((d: DataResult<NASModel>[]) => {
            this.itemGroup = [];
            const data = d.map((d) => d.data).flatMap((d) => d);

            if (data.length) {
                const groups = groupBy(data, (i: NASModel) =>
                    dayjs(i.date).format('YYYY MM DD')
                );
                for (const key of Object.keys(groups)) {
                    this.itemGroup.push({
                        date: key,
                        items: groups[key].reverse(),
                    });
                }
            }

            setTimeout(() => {
                this.updateListDisplay();
            });
        });
    }

    @HostListener('scroll', ['$event'])
    public onMediaListScroll(event) {
        this.updateListDisplay();
    }

    private updateListDisplay() {
        const contentElem = this.mediaContent.nativeElement;
        const displayTop =
            contentElem.offsetTop +
            contentElem.offsetHeight +
            contentElem.scrollTop;

        const displaylength = this.tabs.filter(
            (t) => t.nativeElement.offsetTop <= displayTop
        ).length;

        take(this.itemGroup, displaylength).forEach((i) => (i.display = true));
    }
}
