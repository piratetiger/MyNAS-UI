import { NgModule } from '@angular/core';
import { BaseDirective } from './base/base.directive';
import { UserPermissionDirective } from './user-permission.directive/user-permission.directive';
import { DataAdminPermissionDirective } from './data-admin-permission.directive/data-admin-permission.directive';
import { SystemAdminPermissionDirective } from './system-admin-permission.directive/system-admin-permission.directive';

@NgModule({
    declarations: [
        BaseDirective,
        UserPermissionDirective,
        DataAdminPermissionDirective,
        SystemAdminPermissionDirective,
    ],
    exports: [
        UserPermissionDirective,
        DataAdminPermissionDirective,
        SystemAdminPermissionDirective,
    ],
})
export class SharedDirectivesModule {}
