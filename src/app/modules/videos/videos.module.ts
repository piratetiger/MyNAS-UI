import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideosRoutingModule } from './videos-routing.module';

@NgModule({
    declarations: [VideosComponent],
    imports: [CommonModule, VideosRoutingModule, SharedModule],
})
export class VideosModule {}
