import { Component, Input } from "@angular/core";
import { NASModel } from "src/app/infrastructure/models/nas-model";

@Component({
    template: ''
})
export abstract class CommonViewerComponent {
    @Input() current: NASModel;
}