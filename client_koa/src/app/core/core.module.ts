import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthHttpService } from './authentication/auth-http.service';
import { RequestOptions, XHRBackend } from '@angular/http';
import { UserService } from './user.service';
import { AuthGuard } from './authentication/auth-guard.service';
import { GenesisCore } from './core.service';
import { LoginService } from './login/login.service';
import { AuthenticationDirective } from './authentication/authentication.directive';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';
import { SideNavService } from './side-nav/side-nav.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Genesis application core module.
 * All it's attached features are singletons which will be instantiated only once with app bootstrap
 */
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule
    ],
    exports: [
        NavComponent,
        SideNavComponent,
        LoginComponent,
        FooterComponent,
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AuthenticationDirective
    ],
    declarations: [
        NavComponent,
        SideNavComponent,
        LoginComponent,
        FooterComponent,
        AuthenticationDirective
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
        SideNavService,
        LoginService,
        GenesisCore,
        UserService,
        AuthGuard,
        AuthenticationService,
        {
            provide: AuthHttpService,
            useFactory(backend: XHRBackend, options: RequestOptions) {
                return new AuthHttpService(backend, options);
            },
            deps: [ XHRBackend, RequestOptions ]
        },
        {
            provide: APP_INITIALIZER,
            /**
             * Resolves vital data from server in order to initialize application correctly
             * @param genesis main app service
             * @returns {()=>Promise<T>} when all vital data will be fetch, angular will resume applicaiton bootstrapping
             */
            useFactory(genesis: GenesisCore){
                return () => genesis.init().toPromise();
            },
            deps: [GenesisCore],
            multi: true,
        }
    ]
})
export class CoreModule {
    /**
     * Constructor's module. Ensure the module is not already loaded before creating it
     * @param parentModule core module
     */
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
