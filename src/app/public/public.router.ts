import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const publicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
      { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInModule' },
      { path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpModule' },
      { path: 'lab', loadChildren: './lab/lab.module#LabModule' }
    ]
  }
];

export const PublicRoutingModule: ModuleWithProviders = RouterModule.forChild(publicRoutes);
