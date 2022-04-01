import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserConfigComponent } from './admin-user-config/admin-user-config.component';
import { AdminComponent } from './admin.component';
import { AdminLogComponent } from './admin-log/admin-log.component';
import { GuardService } from 'src/app/shared/services/guard.service';
import { UserRole } from 'src/app/shared/models/user-role';

const routes: Routes = [
    {
        path: '', 
        component: AdminComponent, 
        pathMatch: 'full', 
        canActivate: [GuardService], 
        data: {
            role: [UserRole.SystemAdmin]
        },
    },
    {
        path: 'users', 
        component: AdminUserConfigComponent, 
        canActivate: [GuardService], 
        data: {
            role: [UserRole.SystemAdmin]
        },
    },
    {
        path: 'logs', 
        component: AdminLogComponent, 
        canActivate: [GuardService], 
        data: {
            role: [UserRole.SystemAdmin]
        },
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
