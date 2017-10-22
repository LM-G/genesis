import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../core/guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { PrivateComponent } from './private.component';

const privateRoutes: Route[] = [
    {
        path: '',
        component: PrivateComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', redirectTo: '/home', pathMatch: 'full'},
            {path: 'home', loadChildren: './home/home.module#HomeModule' },
            {path: 'galaxy', loadChildren: './galaxy/galaxy.module#GalaxyModule'}
        ]
    }
];

export const PrivateRoutingModule: ModuleWithProviders = RouterModule.forChild(privateRoutes);
