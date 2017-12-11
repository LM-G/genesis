import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

/**
 * Applicaiton default routes
 * Tries to redirect to home page by default, when no route is provided or unknown one
 */
const appRoutes: Route[] = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
