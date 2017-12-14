import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpSuccessComponent } from '@genesis/public/sign-up/success/sign-up-success.component';
import { NotLoggedOnlyGuard } from '../core/not-logged-only.guard';

import { SignUpComponent } from './sign-up.component';

const signUpRoute: Routes = [
    {
        path: '',
        component: SignUpComponent,
        canActivate: [ NotLoggedOnlyGuard ],
        children: [
            { path: 'success', component: SignUpSuccessComponent },
        ]
    }
];

export const SignUpRoutingModule: ModuleWithProviders = RouterModule.forChild(signUpRoute);
