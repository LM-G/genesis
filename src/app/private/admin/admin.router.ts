import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '@genesis/core/guard/auth.guard';
import { AdminGuard } from './admin-guard.service';
import { AdminComponent } from './admin.component';

const adminRoute: Route[] = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [ AuthGuard, AdminGuard ]
    }
];

export const ADMIN_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(adminRoute);
