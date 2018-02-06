import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicFeatureComponent } from './public-feature.component';

/**
 * Lazy loaded public routes
 */
const publicRoutes: Routes = [
  {
    path: '',
    component: PublicFeatureComponent,
    children: [
      { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
      { path: 'sign-in', loadChildren: '@genesis/sign-in/sign-in.module#SignInModule' },
      { path: 'sign-up', loadChildren: '@genesis/sign-up/sign-up.module#SignUpModule' },
      { path: 'lab', loadChildren: '@genesis/lab/lab.module#LabModule' }
    ]
  }
];

export const PublicRoutingModule: ModuleWithProviders = RouterModule.forChild(publicRoutes);
