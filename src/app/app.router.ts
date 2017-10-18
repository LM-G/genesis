import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Route[] = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

export const AppRoutingModule: ModuleWithProviders =  RouterModule.forRoot(appRoutes);
