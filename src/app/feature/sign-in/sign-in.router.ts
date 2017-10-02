import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignInComponent } from './sign-in.component';

const signInRoute: Route[] = [
    {
        path: 'sign-in',
        component: SignInComponent
    }
];

export const SIGN_IN_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(signInRoute);
