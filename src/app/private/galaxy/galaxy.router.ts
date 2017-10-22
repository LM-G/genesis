import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { GalaxyComponent } from './galaxy.component';

const galaxyRoutes: Routes = [
    {
        path: '',
        component: GalaxyComponent
    }
];

export const GalaxyRoutingModule: ModuleWithProviders = RouterModule.forChild(galaxyRoutes);
