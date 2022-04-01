import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './components/shared-components.module';
import { AppPipesModule } from './pipes/app-pipes.module';
import { AppServicesModule } from './services/app-services.module';

@NgModule({
    declarations: [
    ],
    imports: [
        SharedComponentsModule,
        AppPipesModule,
        AppServicesModule,
    ],
    exports: [
        SharedComponentsModule,
        AppPipesModule,
        AppServicesModule,
    ]
})
export class SharedModule { }
