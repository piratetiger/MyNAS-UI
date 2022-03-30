import { NgModule } from '@angular/core';

import { AppService } from './app.service/app.service';
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
        AppService,
        ApiService,
        AdminApiService
    ],
})
export class AppServicesModule { }
