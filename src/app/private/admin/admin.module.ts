import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { ADMIN_ROUTE_MODULE } from './admin.router';
import { SharedModule } from '../../shared/shared.module';
import { AdminGuard } from './admin-guard.service';

@NgModule({
    imports: [
        SharedModule,
        ADMIN_ROUTE_MODULE
    ],
    declarations: [
        AdminComponent
    ],
    providers: [
        AdminGuard
    ]
})

export class AdminModule {}
