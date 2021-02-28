import { NgModule } from '@angular/core';
import { UserPermissionDirective } from './user-permission.directive/user-permission.directive';
import { DataAdminPermissionDirective } from './data-admin-permission.directive/data-admin-permission.directive';
import { SystemAdminPermissionDirective } from './system-admin-permission.directive/system-admin-permission.directive';


@NgModule({
    declarations: [
        UserPermissionDirective,
        DataAdminPermissionDirective,
        SystemAdminPermissionDirective
    ],
    imports: [
    ],
    exports: [
        UserPermissionDirective,
        DataAdminPermissionDirective,
        SystemAdminPermissionDirective
    ],
    providers: [
    ],
})
export class AppDirectivesModule { }
