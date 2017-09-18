import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login.component';

const dashBoardRoute: Route[] = [
    {
        path: 'sign-in',
        component: LoginComponent,
        //canActivate: [AuthGuard],
    }
];

export const LOGIN_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(dashBoardRoute);
