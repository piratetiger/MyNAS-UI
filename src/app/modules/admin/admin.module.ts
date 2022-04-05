import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminUserConfigComponent } from './admin-user-config/admin-user-config.component';
import { AdminAddUserComponent } from './admin-user-config/admin-add-user/admin-add-user.component';
import { AdminComponent } from './admin.component';
import { AdminLogComponent } from './admin-log/admin-log.component';
import { AdminApiService } from './services/admin-api.service';

@NgModule({
    declarations: [
        AdminComponent,
        AdminUserConfigComponent,
        AdminAddUserComponent,
        AdminLogComponent,
    ],
    imports: [CommonModule, FormsModule, AdminRoutingModule, SharedModule],
    providers: [AdminApiService],
})
export class AdminModule {}
