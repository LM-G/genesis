import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedOnlyGuard } from '@genesis/$core/guard/not-logged-only.guard';

import { SignInComponent } from './sign-in.component';

const signInRoute: Routes = [
  { path: '', component: SignInComponent, canActivate: [ NotLoggedOnlyGuard ] }
];

export const SignInRoutingModule: ModuleWithProviders = RouterModule.forChild(signInRoute);
