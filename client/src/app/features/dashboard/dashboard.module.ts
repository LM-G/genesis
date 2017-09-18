import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DASHBOARD_ROUTE_MODULE} from './dashboard.router';

@NgModule({
    imports: [
        DASHBOARD_ROUTE_MODULE
    ],
    declarations: [
        DashboardComponent
    ]
})

export class DashboardModule {}
