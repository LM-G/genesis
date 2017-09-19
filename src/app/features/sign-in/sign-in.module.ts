import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { SIGN_IN_ROUTE_MODULE } from './sign-in.router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        SIGN_IN_ROUTE_MODULE
    ],
    declarations: [
        SignInComponent
    ]
})

export class SignInModule {}
