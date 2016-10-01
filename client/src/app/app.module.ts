import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { routes } from './app.route';
import { HomeModule } from './home/home.module';
import { SharedTranslateModule } from './shared';

@NgModule({
    imports: [
        BrowserModule,
        HomeModule,
        HttpModule,

        RouterModule.forRoot(routes),
        MaterialModule.forRoot(),
        SharedTranslateModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}
