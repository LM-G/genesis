import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const dashBoardRoute: Route[] = [
  {
    path: '',
    component: DashboardComponent
  }
];

export const DASHBOARD_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(dashBoardRoute);
