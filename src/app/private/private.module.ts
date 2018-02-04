import { NgModule } from '@angular/core';
import { SharedModule } from '@genesis/shared/shared.module';
import { GalaxyModule } from './galaxy/galaxy.module';
import { HeaderComponent } from './header/header.component';
import { HomeModule } from './home/home.module';
import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private.router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SignOutDialogComponent } from './sign-out-dialog/sign-out-dialog.component';

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
    PrivateComponent,
    SignOutDialogComponent
  ],
  entryComponents: [
    SignOutDialogComponent
  ]
})

export class PrivateModule {
}
