import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './components/shared-components.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';

@NgModule({
    declarations: [],
    imports: [SharedComponentsModule, SharedPipesModule],
    exports: [SharedComponentsModule, SharedPipesModule],
})
export class SharedModule {}
