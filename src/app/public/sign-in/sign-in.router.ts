import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SignInComponent } from './sign-in.component';
import { NotLoggedOnlyGuard } from '../../core/guard/not-logged-only.guard';

const signInRoute: Routes = [
    { path: '', component: SignInComponent, canActivate: [NotLoggedOnlyGuard] }
];

export const SignInRoutingModule: ModuleWithProviders = RouterModule.forChild(signInRoute);
