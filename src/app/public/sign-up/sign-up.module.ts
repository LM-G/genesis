import { NgModule } from '@angular/core';
import { SignUpSuccessComponent } from '@genesis/public/sign-up/success/sign-up-success.component';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up.router';

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
