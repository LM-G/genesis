import { NgModule } from '@angular/core';
import { SharedModule } from '@genesis/$shared/shared.module';
import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sign-in.router';

@NgModule({
  imports: [
    SharedModule,
    SignInRoutingModule
  ],
  declarations: [
    SignInComponent
  ]
})

export class SignInModule {
}
