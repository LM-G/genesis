import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { PrivateComponent } from './private.component';

const privateRoutes: Route[] = [
  {
    path: '',
    component: PrivateComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'galaxy', loadChildren: './galaxy/galaxy.module#GalaxyModule' }
    ]
  }
];

export const PrivateRoutingModule: ModuleWithProviders = RouterModule.forChild(privateRoutes);
