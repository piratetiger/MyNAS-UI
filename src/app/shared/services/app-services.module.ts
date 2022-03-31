import { NgModule } from '@angular/core';

import { ApiService } from './api.service/api.service';
import { AdminApiService } from './admin-api.service/admin-api.service';

@NgModule({
    declarations: [
    ],
    imports: [
    ],
    exports: [
    ],
    providers: [
        ApiService,
        AdminApiService
    ],
})
export class AppServicesModule { }
