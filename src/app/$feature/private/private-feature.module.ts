import { NgModule } from '@angular/core';
import { SharedModule } from 'app/$shared/shared.module';
import { GalaxyModule } from 'app/galaxy/galaxy.module';
import { HeaderComponent } from 'app/header/header.component';
import { HomeModule } from 'app/home/home.module';
import { SideNavComponent } from 'app/side-nav/side-nav.component';
import { SignOutDialogComponent } from 'app/sign-out-dialog/sign-out-dialog.component';
import { PrivateFeatureComponent } from './private-feature.component';
import { PrivateRoutingModule } from './private-feature.router';

/**
 * Registers all private features and routes which require user authentication
 */
@NgModule({
  imports: [
    SharedModule,

    GalaxyModule,
    HomeModule,

    PrivateRoutingModule
  ],
  declarations: [
    HeaderComponent,
    SideNavComponent,
    PrivateFeatureComponent,
    SignOutDialogComponent
  ],
  entryComponents: [
    SignOutDialogComponent
  ]
})

export class PrivateFeatureModule {
}
