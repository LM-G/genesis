import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ChatComponent } from './chat.component';
import {AuthGuard} from '../../core/guard/auth.guard';

const chatRoute: Route[] = [
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard],
    }
];

export const chatRouting: ModuleWithProviders = RouterModule.forChild(chatRoute);
