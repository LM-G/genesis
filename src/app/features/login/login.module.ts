import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LOGIN_ROUTE_MODULE} from './login.router';

@NgModule({
    imports: [
        LOGIN_ROUTE_MODULE
    ],
    declarations: [
        LoginComponent
    ]
})

export class LoginModule {}
