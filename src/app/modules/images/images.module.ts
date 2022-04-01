import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImagesRoutingModule } from './images-routing.module';

@NgModule({
    declarations: [ImagesComponent],
    imports: [CommonModule, ImagesRoutingModule, SharedModule],
})
export class ImagesModule {}
