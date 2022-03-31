import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { FilesComponent } from './files.component';

const routes: Routes = [
  { path: '', component: FilesComponent, pathMatch: 'full', canActivate: [AppService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
