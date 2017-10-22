import { NgModule } from '@angular/core';
import { GalaxyComponent } from './galaxy.component';
import { GalaxyRoutingModule } from './galaxy.router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        GalaxyRoutingModule
    ],
    declarations: [
        GalaxyComponent
    ]
})

export class GalaxyModule {}
