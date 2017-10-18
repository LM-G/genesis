import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignInComponent } from './sign-in.component';

const signInRoute: Routes = [
    { path: '', component: SignInComponent }
];

export const SignInRoutingModule: ModuleWithProviders = RouterModule.forChild(signInRoute);
