import { NgModule } from '@angular/core';
import { SharedModule } from '@genesis/shared/shared.module';
import { GalaxyComponent } from './galaxy.component';
import { GalaxyRoutingModule } from './galaxy.router';

@NgModule({
    imports: [
        SharedModule,
        GalaxyRoutingModule
    ],
    declarations: [
        GalaxyComponent
    ]
})

export class GalaxyModule {
}
