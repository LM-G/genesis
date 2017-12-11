import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '@genesis/core/guard/auth.guard';

import { DashboardComponent } from './dashboard.component';

const dashBoardRoute: Route[] = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuard ]
    }
];

export const DASHBOARD_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(dashBoardRoute);
