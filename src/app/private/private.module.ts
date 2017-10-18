import { NgModule } from '@angular/core';
import { PrivateRoutingModule } from './private.router';
import { AdminModule } from './admin/admin.module';
import { ChatModule } from './chat/chat.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from './home/home.module';
import { OverviewModule } from './overview/overview.module';
import { PrivateComponent } from './private.component';
import { GalaxyModule } from './galaxy/galaxy.module';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,

        AdminModule,
        ChatModule,
        DashboardModule,
        GalaxyModule,
        HomeModule,
        OverviewModule,

        PrivateRoutingModule
    ],
    declarations: [
        HeaderComponent,
        SideNavComponent,
        PrivateComponent
    ]
})

export class PrivateModule {}