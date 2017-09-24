import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Main
import { AppComponent } from './app.component';
import { APP_ROUTE_MODULE } from './app.router';
// Core
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
// Features
import { HomeModule } from './features/home/home.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { SignInModule } from './features/sign-in/sign-in.module';


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

        APP_ROUTE_MODULE
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]

})
export class AppModule {}
