import { NgModule } from '@angular/core';
import { AppComponentsModule } from './components/app-components.module';
import { AppPipesModule } from './pipes/app-pipes.module';
import { AppServicesModule } from './services/app-services.module';

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
    ]
})
export class SharedModule { }
