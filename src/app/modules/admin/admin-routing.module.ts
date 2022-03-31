import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserConfigComponent } from './admin-user-config/admin-user-config.component';
import { AdminComponent } from './admin.component';
import { AdminLogComponent } from './admin-log/admin-log.component';

const routes: Routes = [
    { path: '', component: AdminComponent, pathMatch: 'full' },
    { path: 'users', component: AdminUserConfigComponent },
    { path: 'logs', component: AdminLogComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
