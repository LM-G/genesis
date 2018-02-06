import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedOnlyGuard } from 'app/$core/guard/not-logged-only.guard';

import { SignUpComponent } from './sign-up.component';
import { SignUpSuccessComponent } from './success/sign-up-success.component';

const signUpRoute: Routes = [
  {
    path: '',
    canActivate: [ NotLoggedOnlyGuard ],
    children: [
      { path: '', component: SignUpComponent },
      { path: 'success', component: SignUpSuccessComponent },
    ]
  }
];

export const SignUpRoutingModule: ModuleWithProviders = RouterModule.forChild(signUpRoute);
