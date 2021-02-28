import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AppInfrastructureModule } from '../infrastructure/app-infrastructure.module';

import { AdminUserConfigComponent } from './admin-user-config/admin-user-config.component';
import { AdminAddUserComponent } from './admin-user-config/admin-add-user/admin-add-user.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminLogComponent } from './admin-log/admin-log.component';

@NgModule({
    declarations: [
        AdminMainComponent,
        AdminUserConfigComponent,
        AdminAddUserComponent,
        AdminLogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,

        AdminRoutingModule,
        AppInfrastructureModule,
    ],
    exports: [
        AdminMainComponent,
        AdminUserConfigComponent,
        AdminLogComponent,
    ],
    providers: [
    ],
    entryComponents: [
        AdminAddUserComponent
    ]
})
export class AdminModule { }
