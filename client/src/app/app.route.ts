import {Route, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];


export const defaultRouting : ModuleWithProviders =  RouterModule.forRoot(appRoutes);
