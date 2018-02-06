import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/$core/guard/auth.guard';
import { PrivateFeatureComponent } from './private-feature.component';

/**
 * Lazy loaded private routes
 */
const privateRoutes: Route[] = [
  {
    path: '',
    component: PrivateFeatureComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', loadChildren: '@genesis/home/home.module#HomeModule' },
      { path: 'dashboard', loadChildren: '@genesis/dashboard/dashboard.module#DashboardModule' },
      { path: 'galaxy', loadChildren: '@genesis/galaxy/galaxy.module#GalaxyModule' }
    ]
  }
];

export const PrivateRoutingModule: ModuleWithProviders = RouterModule.forChild(privateRoutes);
