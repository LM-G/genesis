import { NgModule } from '@angular/core';
import { GalaxyComponent } from './galaxy.component';
import { GALAXY_ROUTE_MODULE } from './galaxy.router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        GALAXY_ROUTE_MODULE
    ],
    declarations: [
        GalaxyComponent
    ]
})

export class GalaxyModule {}
