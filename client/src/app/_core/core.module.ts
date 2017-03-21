import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav';
import { LoginComponent } from './login';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthHttpService } from './authentication/auth-http.service';
import { RequestOptions, XHRBackend } from '@angular/http';
import { UserService } from './user.service';
import { AuthGuard } from './authentication/auth-guard.service';
import { GenesisCore } from './core.service';
import { LoginService } from './login/login.service';
import { AuthenticationDirective } from './authentication/authentication.directive';
import { SideNavComponent } from './side-nav';
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';

/**
 * Resolves vital data from server in order to initialize application correctly
 * @param genesis main app service
 * @returns {()=>Promise<T>} when all vital data will be fetch
 */
function InitApp(genesis: GenesisCore){
    return () => genesis.init().toPromise();
}

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, MaterialModule, FlexLayoutModule ],
    exports: [ NavComponent, SideNavComponent, LoginComponent, FooterComponent, MaterialModule, FlexLayoutModule ],
    declarations: [ NavComponent, SideNavComponent, LoginComponent, FooterComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
        LoginService,
        GenesisCore,
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
            'deps': [GenesisCore],
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
