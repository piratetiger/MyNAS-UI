import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { LoginComponent } from './core/login/login.component';
import { AppService } from './shared/services/app.service/app.service';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full', canActivate: [AppService] },
  { path: 'login', component: LoginComponent },
  { path: 'images', loadChildren: () => import('./modules/images/images.module').then((m) => m.ImagesModule) },
  { path: 'videos', loadChildren: () => import('./modules/videos/videos.module').then((m) => m.VideosModule) },
  { path: 'files', loadChildren: () => import('./modules/files/files.module').then((m) => m.FilesModule) },
  { path: 'system', loadChildren: () => import('./modules/system/system.module').then((m) => m.SystemModule) },
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
