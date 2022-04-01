import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SystemComponent } from './system.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    declarations: [SystemComponent, UserProfileComponent],
    imports: [CommonModule, FormsModule, SystemRoutingModule, SharedModule],
})
export class SystemModule {}
