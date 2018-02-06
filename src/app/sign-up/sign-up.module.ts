import { NgModule } from '@angular/core';
import { SharedModule } from 'app/$shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up.router';
import { SignUpSuccessComponent } from './success/sign-up-success.component';

@NgModule({
  imports: [
    SharedModule,
    SignUpRoutingModule
  ],
  declarations: [
    SignUpComponent,
    SignUpSuccessComponent
  ]
})
export class SignUpModule {
}
