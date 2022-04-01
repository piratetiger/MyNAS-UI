import { EventEmitter, Injectable } from '@angular/core';
import { NASModel } from 'src/app/shared/models/nas-model';

@Injectable()
export class MediaListService {
    private _selectedItems: NASModel[] = [];
    private _viewMode: boolean = true;

    public viewModeChanged = new EventEmitter<boolean>();
    public refreshMediaList = new EventEmitter<any>();

    public get selectedItems(): NASModel[] {
        return this._selectedItems;
    }

    public set selectedItems(value: NASModel[]) {
        this._selectedItems = value;
    }

    public get viewMode(): boolean {
        return this._viewMode;
    }

    public set viewMode(value: boolean) {
        this._viewMode = value;
    }

    constructor() {
        this.viewModeChanged.subscribe((e) => {
            this._selectedItems = [];
            this._viewMode = e;
        });
    }

    public reset() {
        this._selectedItems = [];
        this._viewMode = true;
    }
}
