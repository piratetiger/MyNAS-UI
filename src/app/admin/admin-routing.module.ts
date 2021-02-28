import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserConfigComponent } from './admin-user-config/admin-user-config.component';
import { AppService } from '../infrastructure/services/app.service/app.service';
import { UserRole } from '../infrastructure/models/user-role';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminLogComponent } from './admin-log/admin-log.component';

const routes: Routes = [
    {
        path: 'admin',
        data: {
            role: [UserRole.SystemAdmin]
        },
        canActivateChild: [AppService],
        children: [
            { path: '', component: AdminMainComponent },
            { path: 'users', component: AdminUserConfigComponent },
            { path: 'logs', component: AdminLogComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
