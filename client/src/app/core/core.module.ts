import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { NavComponent } from './nav';
import { LoginComponent } from './login';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthHttpService } from './authentication/auth-http.service';
import { XHRBackend, RequestOptions } from '@angular/http';
import { UserService } from './user.service';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule ],
    exports: [ NavComponent, LoginComponent ],
    declarations: [ NavComponent, LoginComponent ],
    providers: [
        UserService,
        AuthenticationService,
        {
            provide: AuthHttpService,
            useFactory: (backend: XHRBackend, options: RequestOptions) => {
                return new AuthHttpService(backend, options);
            },
            deps: [ XHRBackend, RequestOptions ]
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
