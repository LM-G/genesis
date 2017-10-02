import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignUpComponent } from './sign-up.component';

const signUpRoute: Route[] = [
    {
        path: 'sign-up',
        component: SignUpComponent
    }
];

export const SIGN_UP_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(signUpRoute);
