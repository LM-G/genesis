import {Route, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { AuthGuard } from './core/components/authentication/auth-guard.service';

const appRoutes: Route[] = [
    { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/home', canActivate: [AuthGuard] }
];

export const APP_ROUTE_MODULE: ModuleWithProviders =  RouterModule.forRoot(appRoutes);
