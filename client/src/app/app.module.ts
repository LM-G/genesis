import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.route';

import { HomeModule } from './home/home.module';


@NgModule({
    imports: [
        BrowserModule,
        HomeModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
