import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PublicComponent } from './public.component';

const publicRoutes: Routes = [
    {
        path: '',
        component: PublicComponent,
        children: [
            {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
            {path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInModule' },
            {path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpModule'}
        ]
    }
];

export const PublicRoutingModule: ModuleWithProviders = RouterModule.forChild(publicRoutes);
