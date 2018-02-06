import { NgModule } from '@angular/core';
import { SharedModule } from '@genesis/$shared/shared.module';
import { AdminGuard } from './admin-guard.service';
import { AdminComponent } from './admin.component';
import { ADMIN_ROUTE_MODULE } from './admin.router';

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
export class AdminModule {
}
