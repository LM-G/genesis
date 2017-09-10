import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home.component';

const homeRoute: Route[] = [
    { path: 'home', component: HomeComponent }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoute);
