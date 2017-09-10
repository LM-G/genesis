import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { defaultRoute } from './app.route';
import { CoreModule } from './core/core.module';
// Features
import { HomeModule } from './features/home/home.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { ChatModule } from './features/chat/chat.module';
import { OverviewModule } from './features/overview/overview.module';
// Material 2
import 'hammerjs';


/**
 * App root module
 */
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,

        CoreModule,

        HomeModule,
        DashboardModule,
        OverviewModule,
        ChatModule,

        defaultRoute
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]

})
export class AppModule {}
