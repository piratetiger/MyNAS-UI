import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { VideosComponent } from './videos.component';

const routes: Routes = [
  { path: '', component: VideosComponent, pathMatch: 'full', canActivate: [AppService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
