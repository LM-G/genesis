import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up.router';

@NgModule({
    imports: [
        SharedModule,
        SignUpRoutingModule
    ],
    declarations: [
        SignUpComponent
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})

export class SignUpModule {
}
