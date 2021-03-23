import { EventEmitter, Injectable } from "@angular/core";
import { NASModel } from "src/app/infrastructure/models/nas-model";

@Injectable()
export class MediaListService {
    private _selectedItems: NASModel[] = [];
    private _editMode: boolean = false;

    public editModeChanged = new EventEmitter<boolean>();
    public refreshMediaList = new EventEmitter<any>();

    public get selectedItems(): NASModel[] {
        return this._selectedItems
    }

    public set selectedItems(value: NASModel[]) {
        this._selectedItems = value;
    }

    public get editMode(): boolean {
        return this._editMode;
    }

    public set editMode(value: boolean) {
        this._editMode = value;
    }

    constructor() {
        this.editModeChanged.subscribe(e => {
            this._selectedItems = [];
            this._editMode = e;
        });
    }
}
