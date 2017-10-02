import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SignUpComponent } from './sign-up.component';
import { SIGN_UP_ROUTE_MODULE } from './sign-up.router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        SIGN_UP_ROUTE_MODULE
    ],
    declarations: [
        SignUpComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})

export class SignUpModule {}
