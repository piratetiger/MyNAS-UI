import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service/app.service';
import { ImagesComponent } from './images.component';

const routes: Routes = [
  { path: '', component: ImagesComponent, pathMatch: 'full', canActivate: [AppService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }
