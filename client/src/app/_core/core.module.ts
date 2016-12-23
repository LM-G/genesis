import { NgModule, SkipSelf, Optional, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { NavComponent } from './nav';
import { LoginComponent } from './login';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthHttpService } from './authentication/auth-http.service';
import { XHRBackend, RequestOptions } from '@angular/http';
import { UserService } from './user.service';
import {AuthGuard} from './authentication/auth-guard.service';
import { Genesis } from './genesis.service';
import { LoginService } from './login/login.service';
import {AuthenticationDirective} from './authentication/authentication.directive';
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject';

/**
 * Resolves vital data from server in order to initialize application correctly
 * @param genesis main app service
 * @returns {()=>Promise<T>} when all vital data will be fetch
 */
function InitApp(genesis: Genesis){
    return () => genesis.init().toPromise();
}

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule ],
    exports: [ NavComponent, LoginComponent ],
    declarations: [ NavComponent, LoginComponent ],
    providers: [
        LoginService,
        Genesis,
        UserService,
        AuthGuard,
        AuthenticationService,
        AuthenticationDirective,
        {
            provide: AuthHttpService,
            useFactory: (backend: XHRBackend, options: RequestOptions) => {
                return new AuthHttpService(backend, options);
            },
            deps: [ XHRBackend, RequestOptions ]
        },
        {
            'provide': APP_INITIALIZER,
            'useFactory': InitApp,
            'deps': [Genesis],
            'multi': true,
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
