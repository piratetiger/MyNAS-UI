import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { NASModel } from "src/app/infrastructure/models/nas-model";
import { CommonViewerComponent } from "../common-viewer/common-viewer.component";
import { ImageViewerComponent } from "../image-viewer/image-viewer.component";
import { VideoViewerComponent } from "../video-viewer/video-viewer.component";

@Component({
    selector: 'detail-viewer',
    templateUrl: './detail-viewer.component.html',
    styleUrls: ['./detail-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailViewerComponent extends CommonViewerComponent implements OnInit {
    @Input() items: NASModel[] = [];

    @ViewChild('viewerContainer', { read: ViewContainerRef, static: true }) viewerContainer: ViewContainerRef;
    component: CommonViewerComponent;

    constructor(private config: DynamicDialogConfig, private componentFactoryResolver: ComponentFactoryResolver) {
        super();
    }

    ngOnInit() {
        this.current = this.config.data.current;
        this.items = this.config.data.items;

        this.loadComponent();
    }

    loadComponent(): void {
        let comp;

        if (this.current) {
            if (this.current.type == 'image') {
                comp = ImageViewerComponent;
            }
            else {
                comp = VideoViewerComponent;
            }

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
            const componentRef = this.viewerContainer.createComponent(componentFactory);
            this.component = <CommonViewerComponent>componentRef.instance;

            this.component.current = this.current;
        }
    }
}
