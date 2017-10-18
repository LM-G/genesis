import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { GalaxyComponent } from './galaxy.component';

const galaxyRoute: Route[] = [
    {
        path: 'galaxy',
        component: GalaxyComponent
    }
];

export const GALAXY_ROUTE_MODULE: ModuleWithProviders = RouterModule.forChild(galaxyRoute);
