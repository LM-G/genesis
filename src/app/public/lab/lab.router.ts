import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabComponent } from '@genesis/public/lab/lab.component';
import { NotLoggedOnlyGuard } from '../core/not-logged-only.guard';

const labRoute: Routes = [
    {
        path: '',
        component: LabComponent,
        canActivate: [ NotLoggedOnlyGuard ]
    }
];

export const LabRoutingModule: ModuleWithProviders = RouterModule.forChild(labRoute);
