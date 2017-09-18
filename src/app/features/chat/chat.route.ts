import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ChatComponent } from './chat.component';
import {AuthGuard} from '../../core/components/authentication/auth-guard.service';

const chatRoute: Route[] = [
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard],
    }
];

export const chatRouting: ModuleWithProviders = RouterModule.forChild(chatRoute);
