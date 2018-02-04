import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Main
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';
// Core
import { CoreModule } from './core/core.module';
import { PrivateModule } from './private/private.module';
// Features
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';


/**
 * App root module
 */
@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,

    PublicModule,
    PrivateModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]

})
export class AppModule {
}
