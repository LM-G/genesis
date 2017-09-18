import { NgModule } from '@angular/core';
// Main
import { AppComponent } from './app.component';
import { APP_ROUTE_MODULE } from './app.router';
// Core
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
// Features
import { HomeModule } from './features/home/home.module';
import 'hammerjs';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { LoginModule } from './features/login/login.module';

/**
 * App root module
 */
@NgModule({
    imports: [
        SharedModule,
        CoreModule,

        HomeModule,
        DashboardModule,
        LoginModule,

        APP_ROUTE_MODULE
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]

})
export class AppModule {}
