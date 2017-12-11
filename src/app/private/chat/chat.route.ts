import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '@genesis/core/guard/auth.guard';

import { ChatComponent } from './chat.component';

const chatRoute: Route[] = [
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [ AuthGuard ],
    }
];

export const chatRouting: ModuleWithProviders = RouterModule.forChild(chatRoute);
