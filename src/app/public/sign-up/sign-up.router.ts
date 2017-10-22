import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignUpComponent } from './sign-up.component';
import { NotLoggedOnlyGuard } from '../core/not-logged-only.guard';

const signUpRoute: Routes = [
    {
        path: '',
        component: SignUpComponent,
        canActivate: [NotLoggedOnlyGuard]
    }
];

export const SignUpRoutingModule: ModuleWithProviders = RouterModule.forChild(signUpRoute);
