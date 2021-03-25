import { NgModule } from '@angular/core';
import { AppComponentsModule } from './components/app-components.module';
import { AppPipesModule } from './pipes/app-pipes.module';
import { AppServicesModule } from './services/app-services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './http-interceptor/auth-interceptor';
import { MessageInterceptor } from './http-interceptor/message-interceptor';
import { BusyIndicatorInterceptor } from './http-interceptor/busy-indicator-interceptor';

@NgModule({
    declarations: [
    ],
    imports: [
        AppComponentsModule,
        AppPipesModule,
        AppServicesModule,
    ],
    exports: [
        AppComponentsModule,
        AppPipesModule,
        AppServicesModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: BusyIndicatorInterceptor, multi: true },
    ],
})
export class AppInfrastructureModule { }
