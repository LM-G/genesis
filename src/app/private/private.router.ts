import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../core/component/authentication/auth-guard.service';
import { HomeComponent } from './home/home.component';

const privateRoutes: Route[] = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent }
        ]
    }
];

export const PrivateRoutingModule: ModuleWithProviders = RouterModule.forChild(privateRoutes);
