import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from 'src/app/shared/services/guard.service';
import { ImagesComponent } from './images.component';

const routes: Routes = [
    {
        path: '',
        component: ImagesComponent,
        pathMatch: 'full',
        canActivate: [GuardService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ImagesRoutingModule {}
