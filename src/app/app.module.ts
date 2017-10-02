import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Main
import { AppComponent } from './app.component';
import { APP_ROUTE_MODULE } from './app.router';
// Core
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
// Features
import { HomeModule } from './feature/home/home.module';
import { DashboardModule } from './feature/dashboard/dashboard.module';
import { SignInModule } from './feature/sign-in/sign-in.module';
import { SignUpModule } from './feature/sign-up/sign-up.module';
import { AdminModule } from './feature/admin/admin.module';


/**
 * App root module
 */
@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        CoreModule,

        HomeModule,
        DashboardModule,
        SignInModule,
        SignUpModule,
        AdminModule,

        APP_ROUTE_MODULE
    ],
    declarations: [
        AppComponent
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    bootstrap: [ AppComponent ]

})
export class AppModule {}
