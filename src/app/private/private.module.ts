import { NgModule } from '@angular/core';
import { PrivateRoutingModule } from './private.router';
import { HomeModule } from './home/home.module';
import { PrivateComponent } from './private.component';
import { GalaxyModule } from './galaxy/galaxy.module';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,

        GalaxyModule,
        HomeModule,

        PrivateRoutingModule
    ],
    declarations: [
        HeaderComponent,
        SideNavComponent,
        PrivateComponent
    ]
})

export class PrivateModule {}