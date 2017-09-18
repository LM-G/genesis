import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OverviewComponent } from './overview.component';
import { AuthGuard } from '../../core/components/authentication/auth-guard.service';

const overviewRoute: Route[] = [
    {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AuthGuard],
    }
];

export const overviewRouting: ModuleWithProviders = RouterModule.forChild(overviewRoute);
