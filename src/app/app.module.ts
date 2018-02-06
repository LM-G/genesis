import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatureModule } from '@genesis/$feature/feature.module';
import { CoreModule } from './$core/core.module';
import { SharedModule } from './$shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';


/**
 * App root module
 */
@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,

    FeatureModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]

})
export class AppModule {
}
