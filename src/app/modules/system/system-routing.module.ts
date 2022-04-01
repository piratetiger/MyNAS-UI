import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from 'src/app/shared/models/user-role';
import { GuardService } from 'src/app/shared/services/guard.service';
import { SystemComponent } from './system.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: SystemComponent, pathMatch: 'full', canActivate: [GuardService] },
  { path: 'user', component: UserProfileComponent, canActivate: [GuardService] },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
    canActivate: [GuardService],
    data: {
      role: [UserRole.SystemAdmin]
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
