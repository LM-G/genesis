import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminComponent } from './admin.component';

const adminRoute: Route[] = [
    {
        path: 'admin',
        component: AdminComponent
    }
];

export const ADMIN_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(adminRoute);
