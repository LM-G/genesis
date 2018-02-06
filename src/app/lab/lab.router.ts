import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedOnlyGuard } from '@genesis/$core/guard/not-logged-only.guard';
import { LabComponent } from '@genesis/lab/lab.component';

const labRoute: Routes = [
  {
    path: '',
    component: LabComponent,
    canActivate: [ NotLoggedOnlyGuard ]
  }
];

export const LabRoutingModule: ModuleWithProviders = RouterModule.forChild(labRoute);
