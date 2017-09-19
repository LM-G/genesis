import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../core/components/authentication/auth-guard.service';

const dashBoardRoute: Route[] = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }
];

export const DASHBOARD_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(dashBoardRoute);
