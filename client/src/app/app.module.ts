import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { defaultRouting } from './app.route';
import { CoreModule } from './_core/core.module';
// Features
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ChatModule } from './chat/chat.module';
import { OverviewModule } from './overview/overview.module';
// Material 2
import 'hammerjs';



@NgModule({
    imports: [
        BrowserModule,
        HttpModule,

        CoreModule,

        HomeModule,
        DashboardModule,
        OverviewModule,
        ChatModule,

        defaultRouting
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]

})
export class AppModule {

}
