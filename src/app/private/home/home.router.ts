import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

export const HomeRoutingModule: ModuleWithProviders = RouterModule.forChild(homeRoutes);
