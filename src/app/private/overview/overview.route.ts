import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '@genesis/core/guard/auth.guard';

import { OverviewComponent } from './overview.component';

const overviewRoute: Route[] = [
    {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [ AuthGuard ],
    }
];

export const overviewRouting: ModuleWithProviders = RouterModule.forChild(overviewRoute);
