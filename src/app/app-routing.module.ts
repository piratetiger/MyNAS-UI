import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppImagesComponent } from './app-images/app-images.component';
import { AppVideosComponent } from './app-videos/app-videos.component';
import { AppFilesComponent } from './app-files/app-files.component';
import { AppService } from './infrastructure/services/app.service/app.service';
import { AppSystemComponent } from './app-system/app-system.component';
import { AppUserProfileComponent } from './app-user-profile/app-user-profile.component';

const routes: Routes = [
  { path: '', component: AppMainComponent, canActivate: [AppService] },
  { path: 'login', component: AppLoginComponent },
  { path: 'images', component: AppImagesComponent, canActivate: [AppService] },
  { path: 'videos', component: AppVideosComponent, canActivate: [AppService] },
  { path: 'files', component: AppFilesComponent, canActivate: [AppService] },
  { path: 'system', component: AppSystemComponent, canActivate: [AppService] },
  { path: 'user', component: AppUserProfileComponent, canActivate: [AppService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
