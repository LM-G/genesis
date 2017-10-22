import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

/**
 * Applicaiton default routes
 * Tries to redirect to home page by default, when no route is provided or unknown one
 */
const appRoutes: Route[] = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

export const AppRoutingModule: ModuleWithProviders =  RouterModule.forRoot(appRoutes);
