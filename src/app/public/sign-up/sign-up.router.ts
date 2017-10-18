import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignUpComponent } from './sign-up.component';

const signUpRoute: Routes = [
    {
        path: '',
        component: SignUpComponent
    }
];

export const SignUpRoutingModule: ModuleWithProviders = RouterModule.forChild(signUpRoute);
