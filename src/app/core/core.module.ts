import { APP_INITIALIZER, NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreService } from './core.service';
import { SharedModule } from '../shared/shared.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './components/authentication/auth-guard.service';

/**
 * Resolves vital data from localstorage/server in order to initialize application correctly. When
 * all vital data will be fetch, angular will resume our app bootstrapping.
 */
const INITIALIZER: Provider = {
    provide: APP_INITIALIZER,
    useFactory(coreService: CoreService){
        return () => coreService.initialize();
    },
    deps: [CoreService],
    multi: true
};

/**
 * Genesis application core module.
 * All it's attached features are singletons which will be instantiated only once with app bootstrap
 */
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,

        SideNavComponent,
        HeaderComponent
    ],
    declarations: [
        SideNavComponent,
        HeaderComponent
    ],
    providers: [
        CoreService,
        AuthGuard,
        INITIALIZER
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
