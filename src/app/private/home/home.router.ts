import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../../core/component/authentication/auth-guard.service';

const homeRoute: Route[] = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    }
];

export const HomeRoutingModule: ModuleWithProviders = RouterModule.forChild(homeRoute);
