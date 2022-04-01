import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from 'src/app/shared/services/guard.service';
import { VideosComponent } from './videos.component';

const routes: Routes = [
    {
        path: '',
        component: VideosComponent,
        pathMatch: 'full',
        canActivate: [GuardService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VideosRoutingModule {}
