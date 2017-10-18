import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin-guard.service';
import { AuthGuard } from '../../core/component/authentication/auth-guard.service';

const adminRoute: Route[] = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];

export const ADMIN_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(adminRoute);
