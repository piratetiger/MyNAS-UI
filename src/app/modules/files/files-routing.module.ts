import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from 'src/app/shared/services/guard.service';
import { FilesComponent } from './files.component';

const routes: Routes = [
    {
        path: '',
        component: FilesComponent,
        pathMatch: 'full',
        canActivate: [GuardService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FilesRoutingModule {}
